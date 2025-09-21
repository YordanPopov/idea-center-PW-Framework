import { z } from 'zod';

export const UserSchema = z.object({
    email: z.string(),
    password: z.string(),
    accessToken: z.string(),
});

export const ErrorResponseSchema = z.object({
    type: z.string(),
    title: z.string(),
    status: z.number().int().min(100).max(599),
    traceId: z.string(),
    errors: z.record(z.string(), z.array(z.string().min(1))),
});

export const CreateIdeaResponseSchema = z.object({
    msg: z.string(),
    idea: z.object({
        title: z.string(),
        url: z.string(),
        description: z.string(),
    }),
});

export const IdeaResponseSchema = z.array(
    z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        url: z.string().nullable(),
        authorUsername: z.string(),
        createdOn: z.string(),
        updatedOn: z.string(),
    })
);
