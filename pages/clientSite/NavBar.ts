import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the NavBar Page.
 * @export
 * @class NavPage
 * @typedef {NavBar}
 */
export default class NavBar {
    constructor(private page: Page) {}

    get homePageNavigationLink(): Locator {
        return this.page.getByRole('link', {
            name: 'Idea Center',
            exact: true,
        });
    }

    get homePageNavigationLogo(): Locator {
        return this.page.getByAltText('Idea Center Logo', {
            exact: true,
        });
    }

    get loginNavigationLink(): Locator {
        return this.page.getByRole('link', {
            name: 'Login',
        });
    }

    get signUpNavigationLink(): Locator {
        return this.page.getByRole('link', {
            name: 'Sign up for free',
        });
    }

    get logoutButton(): Locator {
        return this.page.getByRole('link', {
            name: 'Logout',
        });
    }

    get myProfileLink(): Locator {
        return this.page.getByText('My Profile', {
            exact: true,
        });
    }

    get myIdeasLink(): Locator {
        return this.page.getByText('My Ideas', {
            exact: true,
        });
    }

    get createIdeaLink(): Locator {
        return this.page.getByText('Create Idea', {
            exact: true,
        });
    }
    /**
     * Navigate to the Home page using HomePage link
     *  @returns {Promise<void>} - Resolves when navigation is complete.
     */
    async navigateToHomePageByLink(): Promise<void> {
        await this.homePageNavigationLink.click();
    }

    /**
     * Navigate to the Home page using home page icon
     * @returns {Promise<void>} - Resolves when navigation is complete.
     */
    async navigateToHomePageByLogo(): Promise<void> {
        await this.homePageNavigationLogo.click();
    }

    /**
     * Navigate to the Login page using navigation link
     * @returns {Promise<void>} - Resolves when navigation to the login page is complete.
     */
    async openLoginPage(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/Users/Login') &&
                    response.status() === 200
            ),

            this.loginNavigationLink.click(),
        ]);

        await expect(
            this.page.getByRole('heading', {
                name: 'Sign in',
            })
        ).toBeVisible();
    }

    async openSignUpPage(): Promise<void> {
        await this.signUpNavigationLink.click();

        // expect signUp page heading to be visible
    }

    /**
     * Navigate to the Create Idea Page
     * @returns {Promise<void>} - Resolves when navigation to the create idea page is complete.
     */
    async openCreateIdeaPage(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/Ideas/Create') &&
                    response.status() === 200
            ),
            this.createIdeaLink.click(),
        ]);

        await expect(
            this.page.locator('p', {
                hasText: 'Create new idea',
            })
        ).toBeVisible();
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();

        await expect(this.homePageNavigationLink).toBeVisible();
    }
}
