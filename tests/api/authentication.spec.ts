import { ErrorResponseSchema } from '../../fixtures/api/schemas';
import { ErrorResponse } from '../../fixtures/api/types-guards';
import { test, expect } from '../../fixtures/pom/test-options';
import invalidCredentials from '../../test-data/invalidCredentials.json';

test.describe('Verify API Validation for Log In / Sign Up', () => {
    test(
        'Verify API Validation for Log In',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            const { status, body } = await apiRequest<ErrorResponse>({
                method: 'POST',
                url: 'User/Authentication',
                baseUrl: process.env.API_URL,
                body: {
                    email: invalidCredentials.invalidEmails[2],
                    password: invalidCredentials.invalidPasswords[2],
                },
            });

            expect(status).toBe(400);
            expect(ErrorResponseSchema.parse(body)).toBeTruthy();
        }
    );

    test(
        'Verify API Validation for Sign Up',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            await test.step('Verify API Validation for Invalid Email', async () => {
                for (const invalidEmail of invalidCredentials.invalidEmails) {
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

            await test.step('Verify API Validation for Invalid Username', async () => {
                for (const invalidUsername of invalidCredentials.invalidUsernames) {
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
            await test.step('Verify API Validation for Invalid Password', async () => {
                for (const invalidPassword of invalidCredentials.invalidPasswords) {
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
