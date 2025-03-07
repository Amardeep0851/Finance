import { db } from "@/config/db";
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator"
import { z } from "zod";
import {createId} from "@paralleldrive/cuid2"

const app = new Hono()
  .get('/',
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized access.' }, 401);
      }

      try {
        const data = await db.account.findMany({
          where:{
            userId:auth?.userId
          }
        })
        return c.json({ data });
      } catch (error) {
        console.log("[GET ACCOUNTS]", error);
        return c.json({error:"Internal Error"}, 500)
      }
    }).get(
      "/:id",
      clerkMiddleware(),
      zValidator("param", z.object({
        id:z.string().optional()
      })),
      async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("param")
        if(!auth?.userId){
          return c.json({error:"Unauthorized access."}, 401)
        }
        if(!auth?.userId){
          return c.json({error:"Id cannot be empty."}, 400)
        }
        try {
          const data = await db.account.findFirst({
            where:{
              id:values.id,
              userId:auth.userId
            }
          });
          if(!data){
            return c.json({error:"Account does not exist with this ID"}, 400)
          }
          return c.json({data})
        } catch (error) {
          console.log("[GET_ACCOUNT_BY_ID]", error);
          return c.json({error:"Internal Error."},500)
        }
      }
    ).post(
      "/",
      clerkMiddleware(),
      zValidator("json", z.object({
        name:z.string().min(1, {message:"Name is required."})
      })),

      async (c) => {
        const auth = getAuth(c);
        const {name} = c.req.valid("json");
        if(!auth?.userId){
          return c.json({error:"Unauthorized access."}, 401)
        }
        try {
          const data = await db.account.create({
            data:{
              plaidId:createId(),
              userId:auth.userId,
              name:name
            }
          });
          return c.json({data});
        } catch (error) {
          console.log("[CREATE_ACCOUNT]", error);
          return c.json({error:"Internal Error."},500)
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
          return c.json({error:"Unauthorized access."}, 401)
        }
        try {
          const data = await db.account.deleteMany({
            where:{
              id:{ in:values.ids, },
              userId:auth.userId
            }
          })
          return c.json({data})
        } catch (error) {
          console.log("[DELETE_MANY_ACCOUNT]",error);
          c.json({error:"Somethign went wrong"}, 500)
        }
      }
    ).patch(
      "/:id",
      clerkMiddleware(),
      zValidator("param", z.object({
        id: z.string().nullable().optional()
      })),
      zValidator("json", z.object({
        name: z.string().min(1, { message: "Name is required." })
      })),
      async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("param");
        const { name } = c.req.valid("json");
    
        if (!auth?.userId) {
          return c.json({ error: "Unauthorized access." }, 401);
        }
    
        if (!values.id) {
          return c.json({ error: "ID cannot be empty." }, 400);
        }
        try {
          const data = await db.account.update({
            where: {
              id: values.id,
              userId: auth.userId
            },
            data: { name }
          });
    
          return c.json({ data });
    
        } catch (error) {
          console.error("Update Error:", error);
          return c.json({ error: "Something went wrong." }, 500);
        }
      }
    ).delete("/:id",
      clerkMiddleware(),
      zValidator("param", z.object({
        id:z.string().optional()
      })),
      async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("param")
        if(!auth?.userId){
          return c.json({error:"Unathroized access."}, 401)
        }
        try {
          
        const data = await db.account.delete({
          where:{
            userId:auth.userId,
            id:values.id
          }
        });
        return c.json({data}, 200)
        } catch (error) {
          console.log("[DELETE_ACCOUNT]",error);
          return c.json({error:"Something went wrong"}, 500)
        }
        
      }
    )

export default app; 