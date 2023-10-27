import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { tasks } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        skillRequired: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        name: input.name,
        description: input.description,
        skill_required_id: input.skillRequired,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.tasks.findMany();
  }),

  // remove: publicProcedure
  //   .input(z.object({ id: z.number().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.delete(tasks).where({ id: input.id });
  //   }),

  // assign: publicProcedure
  //   .input(z.object({ id: z.number().min(1) }))
  //   .mutation(async ({ ctx, input }) => {}),
});
