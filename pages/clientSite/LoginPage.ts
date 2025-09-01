import { Page, Locator, expect } from "@playwright/test";
import { NavPage } from "./NavPage";
/**
 * This is the page object for the LoginPage Page.
 * @export
 * @class LoginPage
 * @typedef {LoginPage}
 */
export class LoginPage {
  constructor(private page: Page) {}

  get loginPageHeading(): Locator {
    return this.page.getByRole("heading", {
      name: "Sign in",
      exact: true,
    });
  }

  get emailInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Email",
    });
  }

  get passwordInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Password",
    });
  }

  get signInButton(): Locator {
    return this.page.getByRole("button", {
      name: "Sign in",
    });
  }

  async login(
    email: string,
    password: string,
    navPage: NavPage
  ): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    expect(navPage.logoutButton).toBeVisible();
  }
}
