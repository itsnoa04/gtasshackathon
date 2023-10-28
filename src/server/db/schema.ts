// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTableCreator,
  varchar,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `gtasshackathon_${name}`);

export const teamMembers = mysqlTable(
  "team_member",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    skill: varchar("currently_working_on", {
      length: 256,
    }).notNull(),
    taskCount: bigint("task_count", { mode: "number" }).default(0).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const teamMemberRelations = relations(teamMembers, ({ many, one }) => ({
  tasks: many(tasks),
}));

export const tasks = mysqlTable("task", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").default("").notNull(),
  skill_required: varchar("skill_required", { length: 256 }).notNull(),
  asignedToId: bigint("asigned_to_id", { mode: "number" }).notNull(),
});

export const taskRelation = relations(tasks, ({ one }) => ({
  assignedTo: one(teamMembers, {
    fields: [tasks.asignedToId],
    references: [teamMembers.id],
  }),
}));
