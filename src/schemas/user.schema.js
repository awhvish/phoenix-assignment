import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password should be at least 6 characters" }),
});


export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }), 
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

