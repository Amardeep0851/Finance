import { zValidator } from '@hono/zod-validator';
import { db } from "@/config/db";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { z} from "zod";
import { endOfDay, format, parse, startOfDay, subDays } from "date-fns";


const app = new Hono()
.get("/",
  clerkMiddleware(),
  zValidator("query", z.object({
    from:z.string().optional(),
    to:z.string().optional(),
    accountId:z.string().optional(),
  })),
  async (c) => {
    const auth = getAuth(c);
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }
    function toUtc(date: Date): Date {
      return new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    }

    const {from, to, accountId} = c.req.valid("query");
    console.log(from, to, accountId);
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30)

    
    const fromDateLocal = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;
    const toDateLocal = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    const fromDate = toUtc(startOfDay(fromDateLocal));
    const toDate = toUtc(endOfDay(toDateLocal));

    const data = await db.transaction.findMany({
      where:{
        account:{
          userId:auth.userId
        },
        createdAt:{
          gte:fromDate,
          lte:toDate
        },
        ...(accountId && { accountId })
      },
      include:{
        categories:true,
        account:true
      }
    });
    console.log("data",data);
    return c.json({data}, 200)
  }
).get(
  "/:id",
  clerkMiddleware(),
  zValidator("param", z.object({
    id:z.string().optional()
  })),
  async (c) => {
    const auth = getAuth(c)
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }

    const {id} = c.req.valid("param");

    const data = await db.transaction.findFirst({
      where:{
        id,
        account:{
          userId:auth.userId
        }
      }
    });
    return c.json({data}, 201)
  }
).post("/", 
  clerkMiddleware(),
  zValidator("json", z.object({
    amount:z.number(),
    date:z.coerce.date(),
    payee:z.string(),
    notes:z.string().nullable().optional(),
    categoryId:z.string().nullable().optional(),
    accountId:z.string()
  })),
  async (c) => {
    const auth =  getAuth(c);
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }

    const {amount, date, payee, notes, categoryId, accountId} = c.req.valid("json");
    console.log(amount, date, payee, notes, categoryId, accountId);

    const parsed = parse(format(date, "dd MMM yyyy"), "dd MMM yyyy", new Date());
    const formatedDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));

    
    const data = await db.transaction.create({
      data:{
        date:formatedDate, 
        payee,
        amount,
        notes,
        categoryId,
        accountId
      }
    });
    return c.json({data}, 200)
  }
).post(
  "/bulk-delete",
  clerkMiddleware(),
  zValidator("json", z.object({
    ids:z.array(z.string())
  })),
  async (c) => {
    const auth = getAuth(c);
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401);
    }

    const {ids} = c.req.valid("json");


    const data = await db.transaction.deleteMany({
      where:{
        id:{
          in:ids
        }, 
        account:{
          userId:auth.userId
        }
      }
    });
    return c.json({data}, 200)
  }
).patch("/:id",
  clerkMiddleware(),
  zValidator("json", z.object({
    amount:z.number(),
    date:z.coerce.date(),
    payee:z.string(),
    notes:z.string().nullable().optional(),
    categoryId:z.string().nullable().optional(),
    accountId:z.string()
  })),
  zValidator("param", z.object({
    id:z.string().optional()
  })),
  async (c) => {
    const auth = getAuth(c);
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401);
    }


    const {id} = c.req.valid("param")
    const {amount, date, payee, notes, categoryId, accountId} = c.req.valid("json");
    
    const parsed = parse(format(date, "dd MMM yyyy"), "dd MMM yyyy", new Date());
    const formatedDate = new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
    
    if(!id){
      c.json({error:"ID is required."}, 400)
    }

    const isIDExist = await db.transaction.findFirst({
      where:{
        id,
        account:{
          userId:auth.userId
        }
      }
    });

    if(!isIDExist){
      c.json({error:"ID does not exist. Please try again."})
    }
    
    const data = await db.transaction.update({
      data:{
        date:formatedDate, 
        payee,
        amount,
        notes,
        categoryId,
        accountId
      },
      where:{
        id:id,
        account:{
          userId:auth.userId
        }
      }
    });
    return c.json({data}, 200)
  }
).delete(
  "/:id",
  clerkMiddleware(),
  zValidator("param", z.object({
    id:z.string().optional()
  })),
  async (c) => {
    const auth = getAuth(c)
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }

    const {id} = c.req.valid("param");

    const data = await db.transaction.delete({
      where:{
        id,
        account:{
          userId:auth.userId
        }
      }
    });
    return c.json({data}, 201)
  }
)

export default app