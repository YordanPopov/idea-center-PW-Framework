import { test as setup } from "../fixtures/pom/test-options";

setup("auth user", async ({ homePage, navPage, loginPage, page }) => {
  await setup.step("create logged in user session", async () => {
    await homePage.navigateToHomePage();
    await navPage.openLoginPage();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

    await page.context().storageState({ path: ".auth/userSession.json" });
  });
});
