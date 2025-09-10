/**
 * The function exports a handler for handling GET and POST requests using TRPC with TypeScript.
 * @param {Request} req - The `req` parameter is the incoming HTTP request object. It contains
 * information about the request such as headers, method, URL, and body data. In this context, it is
 * used to handle incoming requests for the TRPC (Typed RPC) server.
 */
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
export { handler as GET, handler as POST };