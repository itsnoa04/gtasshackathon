import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        currentlyWorkingOn: z.number().min(1),
        skills: z.array(z.number().min(1)),
      }),
    )
    .mutation(async ({ ctx, input }) => {}),

  getAll: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {}),

  getOne: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(async ({ ctx, input }) => {}),

  remove: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {}),
});
