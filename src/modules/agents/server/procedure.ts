/* This TypeScript code snippet is setting up a router for handling TRPC (Typed RPC) requests related
to agents. Here's a breakdown of what the code is doing: */
/* This TypeScript code snippet is importing modules and defining a router for handling TRPC (Typed
RPC) requests related to agents. Here's a breakdown of what the code is doing: */
import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  
  protectedProcedure,
} from "@/trpc/init";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";

export const agentsRouter = createTRPCRouter({
  //GetOne
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),
  //TODO: change getMany to use protectedProcedure
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createAgent;
    }),
});
