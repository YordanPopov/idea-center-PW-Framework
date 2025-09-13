import { title } from "process";
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  accessToken: z.string(),
});

export const ErrorResponseSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  traceId: z.string(),
  errors: z.object({
    Email: z.array(z.string()).optional(),
    UserName: z.array(z.string()).optional(),
    Password: z.array(z.string()).optional(),
    Repassword: z.array(z.string()).optional(),
  }),
});

export const CreateIdeaResponseSchema = z.object({
  msg: z.string(),
  idea: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string(),
  }),
});

export const IdeaResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().nullable(),
  authorUsername: z.string(),
  createdOn: z.string(),
  updatedOn: z.string(),
});
