import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export default class HomePage {
    constructor(private page: Page) {}

    get homePageCarousel(): Locator {
        return this.page.locator('.carousel');
    }

    async navigateToHomePage(): Promise<void> {
        await this.page.goto(process.env.URL as string);

        await expect(this.homePageCarousel).toBeVisible();
    }
}
