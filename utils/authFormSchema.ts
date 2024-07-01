import { z } from "zod";

export const authFormSchema = (type: string) =>
  z.object({
    firstname: type === "sign-in" ? z.string().optional() : z.string().min(2),
    lastname: type === "sign-in" ? z.string().optional() : z.string().max(20),
    username: z.string().min(3),
    email: type === "sign-in" ? z.string().optional() : z.string().email(),
    password: z.string().min(8),
  });