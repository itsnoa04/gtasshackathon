// import { z } from "zod";
import { createTRPCRouter } from "../trpc";

export const teamRouter = createTRPCRouter({
  // create: publicProcedure
  //   .input(
  //     z.object({
  //       name: z.string().min(1),
  //       currentlyWorkingOn: z.number().min(1),
  //       skills: z.array(z.number().min(1)),
  //     }),
  //   )
  //   .mutation(async ({}) => {}),
  // getAll: publicProcedure.input(z.object({})).query(async ({}) => {}),
  // getOne: publicProcedure
  //   .input(z.object({ id: z.number().min(1) }))
  //   .query(async ({}) => {}),
  // remove: publicProcedure
  //   .input(z.object({ id: z.number().min(1) }))
  //   .mutation(async ({}) => {}),
});
