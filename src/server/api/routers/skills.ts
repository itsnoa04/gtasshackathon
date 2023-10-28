import { createTRPCRouter, publicProcedure } from "../trpc";
import skills from "../skills";

export const skillsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return skills;
  }),
});
