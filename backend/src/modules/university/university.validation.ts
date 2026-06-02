import { z } from "zod";

export const createUniversitySchema = z.object({
  name: z.string().min(3),
  code: z.string().min(2),
  slug: z.string().min(2),
});