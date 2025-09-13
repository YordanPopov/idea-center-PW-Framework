import { test as setup, expect } from "../fixtures/pom/test-options";
import { User } from "../fixtures/api/types-guards";
import { UserSchema } from "../fixtures/api/schemas";

setup(
  "auth user",
  async ({ homePage, navPage, loginPage, page, apiRequest }) => {
    await setup.step("auth for user by API", async () => {
      const { status, body } = await apiRequest<User>({
        method: "POST",
        url: "User/Authentication",
        baseUrl: process.env.API_URL,
        body: {
          email: process.env.EMAIL,
          password: process.env.PASSWORD,
        },
      });

      expect(status).toBe(200);
      expect(UserSchema.parse(body)).toBeTruthy();
      process.env["ACCESS_TOKEN"] = body.accessToken;
    });

    await setup.step("create logged in user session", async () => {
      await homePage.navigateToHomePage();
      await navPage.openLoginPage();
      await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

      await page.context().storageState({ path: ".auth/userSession.json" });
    });
  }
);
