import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the Login Page.
 * @export
 * @class LoginPage
 * @typedef {LoginPage}
 */
export default class LoginPage {
    constructor(private page: Page) {}

    get emailInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Email',
        });
    }

    get passwordInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Password',
        });
    }

    get rememberPassCheck(): Locator {
        return this.page.locator('#form1Example3');
    }

    get signInButton(): Locator {
        return this.page.getByRole('button', {
            name: 'Sign in',
            exact: true,
        });
    }

    get mainErrorMessage(): Locator {
        return this.page.locator('.validation-summary-errors');
    }

    get emailErrorMessage(): Locator {
        return this.page.locator('span[data-valmsg-for="Email"]');
    }

    get passErrorMessage(): Locator {
        return this.page.locator('span[data-valmsg-for="Password"]');
    }

    /**
     * Login with provided email and password
     * @param {string} email - user login email
     * @param password - user login password
     * @returns {Promise<void>} - Resolves when user is logged in
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();

        await expect(
            this.page.locator('h5', {
                hasText: process.env.USER_NAME,
            })
        ).toBeVisible();
    }

    /**
     * Negative login attempt and verifies validation error messages
     * @param email - Email value to be entered
     * @param password - Password value to be entered
     * @returns {Promise<void>} - Resolves once all assertions are completed
     */
    async unsuccessfulLogin(email?: string, password?: string): Promise<void> {
        const isEmailEmpty = email === undefined || email.trim() === '';
        const isPasswordEmpty =
            password === undefined || password.trim() === '';

        if (email != undefined) {
            await this.emailInput.fill(email);
        }

        if (password != undefined) {
            await this.passwordInput.fill(password);
        }

        await this.signInButton.click();
        await expect(this.mainErrorMessage).toHaveText('Unable to sign in!');

        if (isEmailEmpty) {
            await expect(this.emailErrorMessage).toHaveText(
                'The e-mail is required!'
            );
        }

        if (isPasswordEmpty) {
            await expect(this.passErrorMessage).toHaveText(
                'The password is required!'
            );
        }
    }
}
