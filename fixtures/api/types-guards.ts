import { z } from 'zod';
import type {
    CreateIdeaResponseSchema,
    UserSchema,
    ErrorResponseSchema,
    IdeaResponseSchema,
} from './schemas';

export type ApiRequestParams = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | null;
    headers?: string;
};

export type ApiRequestResponse<T = unknown> = {
    status: number;
    body: T;
};

export type ApiRequestFn = <T = unknown>(
    params: ApiRequestParams
) => Promise<ApiRequestResponse<T>>;

export type ApiRequestMethods = {
    apiRequest: ApiRequestFn;
};

export type User = z.infer<typeof UserSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type CreateIdeaResponse = z.infer<typeof CreateIdeaResponseSchema>;
export type IdeaResponse = z.infer<typeof IdeaResponseSchema>;
