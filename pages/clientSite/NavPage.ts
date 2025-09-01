import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { CreateIdeaPage } from "./CreateIdeaPage";
/**
 * This is the page object for the NavPage Page.
 * @export
 * @class NavPage
 * @typedef {NavPage}
 */
export class NavPage {
  constructor(private page: Page) {}

  get homePageNavigationLink(): Locator {
    return this.page.getByRole("link", {
      name: "Idea Center",
      exact: true,
    });
  }

  get homePageNavigationLogo(): Locator {
    return this.page.getByAltText("Idea Center Logo", {
      exact: true,
    });
  }

  get loginNavigationLink(): Locator {
    return this.page.getByRole("link", {
      name: "Login",
    });
  }

  get signUpNavigationLink(): Locator {
    return this.page.getByRole("link", {
      name: "Sign up for free",
    });
  }

  get logoutButton(): Locator {
    return this.page.getByRole("link", {
      name: "Logout",
    });
  }

  get myProfileLink(): Locator {
    return this.page.getByText("My Profile", {
      exact: true,
    });
  }

  get myIdeasLink(): Locator {
    return this.page.getByText("My Ideas", {
      exact: true,
    });
  }

  get createIdeaLink(): Locator {
    return this.page.getByText("Create Idea", {
      exact: true,
    });
  }

  async navigateToHomePageByLink(): Promise<void> {
    await this.homePageNavigationLink.click();
  }

  async navigateToHomePageByLogo(): Promise<void> {
    await this.homePageNavigationLogo.click();
  }

  async openLoginPage(loginPage: LoginPage): Promise<void> {
    await this.loginNavigationLink.click();

    await expect(loginPage.loginPageHeading).toBeVisible();
  }

  async openSignUpPage(): Promise<void> {
    await this.signUpNavigationLink.click();

    // expect signUp page heading to be visible
  }

  async openCreateIdeaPage(createIdeaPage: CreateIdeaPage): Promise<void> {
    await this.createIdeaLink.click();

    await expect(createIdeaPage.createIdeaHeading).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();

    await expect(this.homePageNavigationLink).toBeVisible();
  }
}
