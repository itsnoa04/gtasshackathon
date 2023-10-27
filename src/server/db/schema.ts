// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { Many, Relation, relations, sql } from "drizzle-orm";
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

export const skill = mysqlTable(
  "skill",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const skillRelations = relations(skill, ({ many, one }) => ({
  tasks: many(tasks),
  teamMembers: many(teamMembers),
}));

export const teamMembers = mysqlTable(
  "team_member",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    currentlyWorkingOn: bigint("currently_working_on", { mode: "number" }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const teamMemberRelations = relations(teamMembers, ({ many, one }) => ({
  tasks: many(tasks),
  skills: many(skill),
  currentlyWorkingOn: one(skill, {
    fields: [teamMembers.currentlyWorkingOn],
    references: [skill.id],
  }),
}));

export const tasks = mysqlTable("task", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").default("").notNull(),
  skill_required_id: bigint("skill_required_id", { mode: "number" }).notNull(),
  asignedToId: bigint("asigned_to_id", { mode: "number" }),
  isAssigned: boolean("is_assigned").default(false).notNull(),
});

export const taskRelation = relations(tasks, ({ many, one }) => ({
  author: one(teamMembers, {
    fields: [tasks.asignedToId],
    references: [teamMembers.id],
  }),
  skillRequired: one(skill, {
    fields: [tasks.skill_required_id],
    references: [skill.id],
  }),
}));
