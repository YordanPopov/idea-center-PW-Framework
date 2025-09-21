import { Page, Locator, expect } from '@playwright/test';
/**
 * This is the page object for the CreateIdeaPage Page.
 * @export
 * @class CreateIdeaPage
 * @typedef {CreateIdeaPage}
 */
export class CreateIdeaPage {
    constructor(private page: Page) {}

    get createIdeaHeading(): Locator {
        return this.page.getByRole('paragraph', {
            name: 'Create new idea',
        });
    }

    get ideaTitleInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Title',
        });
    }

    get ideaPictureInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Url',
        });
    }

    get ideaDescriptionInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Describe your idea',
        });
    }

    get createIdeaButton(): Locator {
        return this.page.getByRole('button', {
            name: 'Create',
        });
    }

    /**
     * Create an idea. imgUrl can be optionally filled.
     *
     * @param {object} params - Object with optional idea fields
     * @param {string} [params.title] - title for the idea
     * @param {string} [params.imgUrl] - image URL
     * @param {string} [params.description] - description
     * @returns {Promise<void>} - Resolves when creating is complete.
     */

    async createIdea(params: {
        title: string;
        imgUrl?: string;
        description: string;
    }): Promise<void> {
        const { title, imgUrl, description } = params;

        await this.ideaTitleInput.fill(title);
        await this.ideaDescriptionInput.fill(description);

        if (imgUrl) {
            await this.ideaPictureInput.fill(imgUrl);
        }

        await Promise.all([
            this.page.waitForResponse(
                (resp) =>
                    resp.url().includes('/Ideas/MyIdeas') &&
                    resp.status() === 200
            ),
            this.createIdeaButton.click(),
        ]);

        await expect(
            this.page.locator('.card-body > p', {
                hasText: description,
            })
        ).toBeVisible();
    }
}
