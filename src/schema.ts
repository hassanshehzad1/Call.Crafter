/* This TypeScript code snippet is defining a schema using the Zod library for validating data. */
import { z } from "zod";

export const meetingInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z.string().min(1, { message: "Instructions is required" }),
});

// Agent update schema
export const meetingsUpdateSchema = meetingInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
