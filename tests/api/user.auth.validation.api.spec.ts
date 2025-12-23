import { test, expect } from '@fixtures/pom/test-options';
import {
    ErrorResponseSchema,
    InvalidCredentialsSchema,
} from '@fixtures/api/schemas';
import {
    ErrorResponse,
    InvalidCredentialsResponse,
} from '@fixtures/api/types-guards';
import {
    invalidEmails,
    invalidPasswords,
    invalidUsernames,
    invalidCredentials,
} from '@test-data/credentials';

test.describe('USER | AUTH | API | validation', () => {
    test(
        'LOGIN | invalid credentials',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            const { status, body } =
                await apiRequest<InvalidCredentialsResponse>({
                    method: 'POST',
                    url: 'User/Authentication',
                    baseUrl: process.env.API_URL,
                    body: {
                        email: invalidCredentials.email,
                        password: invalidCredentials.password,
                    },
                });

            expect(status).toBe(400);
            expect(InvalidCredentialsSchema.parse(body)).toBeTruthy();
        }
    );

    test(
        'SIGN UP | invalid email, username, password',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            await test.step('SIGN UP | invalid email', async () => {
                for (const invalidEmail of invalidEmails) {
                    const { status, body } = await apiRequest<ErrorResponse>({
                        method: 'POST',
                        url: 'User/Create',
                        baseUrl: process.env.API_URL,
                        body: {
                            userName: `testuser${Date.now()}`,
                            email: invalidEmail,
                            password: 'test1234',
                            rePassword: 'test1234',
                            acceptedAgreement: true,
                        },
                    });

                    expect(status).toBe(400);
                    expect(ErrorResponseSchema.parse(body)).toBeTruthy();
                }
            });

            await test.step('SIGNUP | invalid username', async () => {
                for (const invalidUsername of invalidUsernames) {
                    const { status, body } = await apiRequest<ErrorResponse>({
                        method: 'POST',
                        url: 'User/Create',
                        baseUrl: process.env.API_URL,
                        body: {
                            userName: invalidUsername,
                            email: `testuser${Date.now()}@email.com`,
                            password: 'test1234',
                            rePassword: 'test1234',
                            acceptedAgreement: true,
                        },
                    });

                    expect(status).toBe(400);
                    expect(ErrorResponseSchema.parse(body)).toBeTruthy();
                }
            });
            await test.step('SIGNUP | invalid password', async () => {
                for (const invalidPassword of invalidPasswords) {
                    const { status, body } = await apiRequest<ErrorResponse>({
                        method: 'POST',
                        url: 'User/Create',
                        baseUrl: process.env.API_URL,
                        body: {
                            userName: `testuser${Date.now()}`,
                            email: `testuser${Date.now()}@email.com`,
                            password: invalidPassword,
                            rePassword: invalidPassword,
                            acceptedAgreement: true,
                        },
                    });

                    expect(status).toBe(400);
                    expect(ErrorResponseSchema.parse(body)).toBeTruthy();
                }
            });
        }
    );
});
