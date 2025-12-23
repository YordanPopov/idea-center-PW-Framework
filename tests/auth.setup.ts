import { test, expect } from '@fixtures/pom/test-options';
import { User } from '@fixtures/api/types-guards';
import { UserSchema } from '@fixtures/api/schemas';

test('auth user', async ({ homePage, navBar, loginPage, page, apiRequest }) => {
    await test.step('auth for user by API', async () => {
        const { status, body } = await apiRequest<User>({
            method: 'POST',
            url: 'User/Authentication',
            baseUrl: process.env.API_URL,
            body: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
            },
        });

        expect(status).toBe(200);
        expect(UserSchema.parse(body)).toBeTruthy();
        process.env['ACCESS_TOKEN'] = body.accessToken;
    });

    await test.step('create logged in user session', async () => {
        await homePage.navigateToHomePage();
        await navBar.openLoginPage();
        await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

        await page.context().storageState({ path: '.auth/userSession.json' });
    });
});
