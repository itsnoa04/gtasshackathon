// import { z } from "zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { tasks, teamMembers } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const teamRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        skill: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .insert(teamMembers)
        .values({
          name: input.name,
          skill: input.skill,
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        });

      return {
        name: input.name,
        skill: input.skill,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.teamMembers.findMany({
      with: {
        tasks: true,
      },
    });

    return result;
  }),

  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.query.teamMembers.findFirst({
        with: {
          tasks: true,
        },
        where: (user, { eq }) => {
          return eq(user.id, input.id);
        },
      });

      user &&
        user.tasks.length > 0 &&
        user.tasks.forEach(async (task) => {
          await ctx.db.delete(tasks).where(eq(tasks.id, task.id));
        });
      await ctx.db
        .delete(teamMembers)
        .where(eq(teamMembers.id, input.id))
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        });
    }),
});
