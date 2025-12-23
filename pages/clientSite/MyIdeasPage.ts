import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the MyIdeas Page.
 * @export
 * @class MyIdeasPage
 * @typedef {MyIdeasPage}
 */
export default class MyIdeasPage {
    constructor(private page: Page) {}

    get noIdeasMessage(): Locator {
        return this.page.getByText('No Ideas yet!');
    }

    get ideaDescription(): Locator {
        return this.page.locator('.card-body > p').last();
    }

    get viewButton(): Locator {
        return this.page.getByRole('link', {
            name: 'View',
        });
    }

    get editButton(): Locator {
        return this.page.getByRole('link', {
            name: 'Edit',
        });
    }

    get deleteButton(): Locator {
        return this.page.getByRole('link', {
            name: 'Delete',
        });
    }

    /**
     * Deletes an idea and waits for the deletion to complete
     * @returns {Promise<void} - Resolves when the idea is deleted
     */
    async deleteIdea(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/Ideas/MyIdeas') &&
                    response.status() === 200
            ),
            this.deleteButton.click(),
        ]);

        await expect(this.noIdeasMessage).toBeVisible();
    }

    /**
     * Open Edit Idea page
     * @returns {Promise<void>} - Resolves when EditIdeaPage is opened
     */
    async openEditIdeaPage(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('/Ideas/Edit') &&
                    response.status() === 200
            ),
            this.editButton.click(),
        ]);

        await expect(
            this.page.locator('p', {
                hasText: 'Edit the idea',
            })
        ).toBeVisible();
    }

    /**
     * Open View Idea page
     * @returns {Promise<void>} - Resolves when View Idea page is opened
     */
    async openViewIdeaPage(): Promise<void> {
        await Promise.all([
            this.page.waitForResponse(
                (response) =>
                    response.url().includes('Ideas/Read?') &&
                    response.status() === 200
            ),
            this.viewButton.click(),
        ]);

        await expect(
            this.page.locator('a', { hasText: process.env.USER_NAME })
        ).toBeVisible();
    }
}
