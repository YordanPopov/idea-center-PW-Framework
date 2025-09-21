import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the MyIdeas Page.
 * @export
 * @class MyIdeasPage
 * @typedef {MyIdeasPage}
 */
export class MyIdeasPage {
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
        await expect(
            this.page.locator('.card-body > h5', {
                hasText: 'UPDATED test description',
            })
        ).toHaveCount(0);
    }

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
}
