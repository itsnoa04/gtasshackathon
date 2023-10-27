import { createTRPCRouter } from "~/server/api/trpc";
import { taskRouter } from "./routers/task";
import { teamRouter } from "./routers/team";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
