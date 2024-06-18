import { serial, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial,
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jovExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  mockId: varchar('mockId').notNull()
})