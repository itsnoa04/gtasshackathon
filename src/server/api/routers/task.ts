import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { tasks, teamMembers } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        taskName: z.string().min(1),
        taskDescription: z.string().min(1),
        skillRequired: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.teamMembers.findFirst({
        with: {
          tasks: true,
        },
        where: (user, { eq }) => {
          return eq(user.skill, input.skillRequired);
        },
        orderBy: (user, { desc }) => [desc(user.taskCount)],
      });

      if (!user) {
        throw new TRPCError({
          message: "No user found with the required skill",
          code: "NOT_FOUND",
        });
      }

      await ctx.db
        .insert(tasks)
        .values({
          name: input.taskName,
          description: input.taskDescription,
          skill_required: input.skillRequired,
          asignedToId: user.id,
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      await ctx.db.update(teamMembers).set({
        taskCount: user.taskCount + 1,
      });
    }),

  getByAssignedTo: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.tasks.findMany({
        where: (task, { eq }) => {
          return eq(task.asignedToId, input);
        },
        with: {
          assignedTo: true,
        },
      });

      return result;
    }),
});

// export const taskRouter = createTRPCRouter({
//   create: publicProcedure
//     .input(
//       z.object({
//         name: z.string().min(1),
//         description: z.string().min(1),
//         skillRequired: z.number().min(1),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       await ctx.db.insert(tasks).values({
//         name: input.name,
//         description: input.description,
//         skill_required_id: input.skillRequired,
//       });
//     }),

// getAll: publicProcedure.query(async ({ ctx }) => {
//   return await ctx.db.query.tasks.findMany();
// }),

// remove: publicProcedure
//   .input(z.object({ id: z.number().min(1) }))
//   .mutation(async ({ ctx, input }) => {
//     await ctx.db.delete(tasks).where({ id: input.id });
//   }),

// assign: publicProcedure
//   .input(z.object({ id: z.number().min(1) }))
//   .mutation(async ({ ctx, input }) => {}),
// });
