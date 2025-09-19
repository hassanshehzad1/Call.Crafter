/* This TypeScript code snippet is setting up a router for handling TRPC (Typed RPC) requests related
to agents. Here's a breakdown of what the code is doing: */
/* This TypeScript code snippet is importing modules and defining a router for handling TRPC (Typed
RPC) requests related to agents. Here's a breakdown of what the code is doing: */
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { meetingInsertSchema, meetingsUpdateSchema } from "@/schema";

export const meetingRouter = createTRPCRouter({
  // Update
  update: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updateMeeting] = await db
        .update(meetings)
        .set(input)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning();

      if (!updateMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }
      return updateMeeting;
    }),
  //GetOne
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          // TODO: Change to actual count
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        );

      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not Found",
        });
      }
      return existingMeeting;
    }),
  //TODO: change getMany to use protectedProcedure
  getMany: protectedProcedure
    .input(
      z
        .object({
          page: z.number().default(1),
          pageSize: z.number().min(1).max(100).default(2),
          search: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      //   throw new TRPCError({"BAD_REQUST"})
      const data = await db
        .select({
          agent: agents,
          ...getTableColumns(meetings),
          duration:
            sql<number>`EXTRACT (EPOCH FROM (ended_at - started_at))`.as(
              "duration"
            ),
        })
        .from(meetings)
        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(meetings)

        .innerJoin(agents, eq(meetings.agentId, agents.id))
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        );

      const totalPage = Math.ceil(total.count / pageSize);
      return {
        items: data,
        total: total.count,
        totalPage,
      };
    }),

  create: protectedProcedure
    .input(meetingInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      // TODO: Create stream call, Upsert stream users
      return createdMeeting;
    }),
});
