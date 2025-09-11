/* This TypeScript code snippet is importing modules and defining a router for handling TRPC (Typed
RPC) requests related to agents. Here's a breakdown of what the code is doing: */
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";


export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),
});
