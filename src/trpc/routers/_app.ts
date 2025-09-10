/* This code snippet is defining an API router using TRPC (Typed RPC) library in TypeScript. Here's a
breakdown of what each part of the code is doing: */
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  /* `hello: baseProcedure` is defining a procedure named `hello` using the `baseProcedure` function.
  This procedure includes an input validation schema that expects an object with a `text` property
  of type string. The procedure also defines a query function that takes in options and returns an
  object with a greeting message that includes the input text provided. */
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;