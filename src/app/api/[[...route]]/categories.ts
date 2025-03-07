import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { db } from "@/config/db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
.get("/",
  clerkMiddleware(),
  async (c) => {
    const auth = getAuth(c);
    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }

    const data = await db.category.findMany({
      where:{
        userId:auth.userId
      }
    });
    return c.json({data}, 200)
  }
).get("/:id", 
  clerkMiddleware(),
  zValidator("param", z.object({
    id:z.string().nullable().optional()
  })),
  async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("param");

    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401);
    }

    try {
      const data = await db.category.findFirst({
        where:{
          id:values.id as string,
          userId:auth.userId
        }
      })
      return c.json({data})
    } catch (error) {
      console.log("[GET_CATEGORY_BY_ID]", error);
      return c.json({error:"Internal Error."}, 500)
    }
  }
).post("/", 
  clerkMiddleware(),
  zValidator("json", z.object({
    name:z.string().min(1, {message:"Name is required."})
  })),
  async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("json")

    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401);
    }

    try {
      const data = await db.category.create({
        data:{
          plaidId:createId(),
          userId:auth.userId,
          name:values.name
        }
      })
      return c.json({data}, 200)
    } catch (error) {
      console.log("[CREATING_CATEGORY_ERROR]", error);
      return c.json({error:"Internal Error."}, 500)
    }
  }
).post("/bulk-delete",
  clerkMiddleware(),
  zValidator("json", z.object({
    ids:z.array(z.string())
  })),
  async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("json");

    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401);
    }

    try {
      const data = await db.category.deleteMany({
        where:{
          userId:auth.userId,
          id:{
            in:values.ids
          }
        }
      })
      return c.json({data}, 200)
    } catch (error) {
      console.log("[BULK_DELETE]",error);
      return c.json({error:"Internal Error."}, 500)
    }
  }
).delete("/:id",
  clerkMiddleware(),
  zValidator("param", z.object({
    id:z.string().nullable().optional()
  })),
  async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("param");

    if(!auth?.userId){
      return c.json({error:"Unauthorized access."}, 401)
    }

    try {
      const data = await db.category.delete({
        where:{
          id:values.id as string,
          userId:auth.userId
        }
      })
      return c.json({data})
    } catch (error) {
      console.log("[DELETE_BY_ID]", error);
      return c.json({error:"Internal Error."}, 500)
    }
  }
).patch("/:id", 
  clerkMiddleware(),
  zValidator("param", z.object({
    id:z.string().nullable().optional()
  })),
  zValidator("json", z.object({
    name:z.string().min(1, {message:"Name is required."})
  })),
  async (c) => {
    const auth = getAuth(c);
    const {id} = c.req.valid("param");
    const {name} = c.req.valid("json");

    if(!auth?.userId){
      return c.json({error:"Unauthroized access."}, 401);
    }

    try {
      const data = await db.category.update({
        where:{
          id:id as string,
          userId:auth.userId
        },
        data:{
          name
        }
      })
      return c.json({data}, 200)
    } catch (error) {
      console.log("[UPDATE_CATEGORY]", error);
      return c.json({error:"Internal Error"}, 500)
    }
  }
)

export default app