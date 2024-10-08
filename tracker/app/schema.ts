import { z } from "zod";

export const schema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title can be up to 255 characters long'),
    description: z.string().min(1, 'Description is required'),
  });