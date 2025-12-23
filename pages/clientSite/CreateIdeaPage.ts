import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the CreateIdea Page.
 * @export
 * @class CreateIdeaPage
 * @typedef {CreateIdeaPage}
 */
export default class CreateIdeaPage {
    constructor(private page: Page) {}

    get ideaTitleInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Title',
        });
    }

    get ideaPictureInput(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Add Picture',
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

    get globalErrorMessage(): Locator {
        return this.page.locator('.validation-summary-errors');
    }

    get titleErrorMessage(): Locator {
        return this.page.locator('span[data-valmsg-for="Title"]');
    }

    get descriptionErrorMessage(): Locator {
        return this.page.locator('span[data-valmsg-for="Description"]');
    }

    /**
     * Create an idea. imgUrl can be optionally filled.
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

    /**
     * Attempts to create an idea with provided data and validates the expected errors
     * @param data - The idea data and expected validation results
     * @param data.title - Optional title for the idea
     * @param data.imgUrl - Optional Img URL for the idea
     * @param data.description - Optional description for the idea
     * @param data.expect - Expected error states after submission
     * @param data.expect.globalError - Whether a global error message should be displayed
     * @param data.expect.titleError - Whether a title error message should be displayed
     * @param data.expect.descriptionError - Whether a description error message should be displayed
     * @returns {Promise<void>} - Resolves when the form is submitted
     */
    async attemptToCreateIdea(data: {
        title?: string;
        imgUrl?: string;
        description?: string;
        expect: {
            globalError?: boolean;
            titleError?: boolean;
            descriptionError?: boolean;
        };
    }): Promise<void> {
        const isTitleEmpty =
            data.title === undefined || data.title.trim() == '';
        const isDescriptionEmpty =
            data.description === undefined || data.description.trim() === '';

        if (data.title) {
            await this.ideaTitleInput.fill(data.title);
        }

        if (data.imgUrl) {
            await this.ideaPictureInput.fill(data.imgUrl);
        }

        if (data.description) {
            await this.ideaDescriptionInput.fill(data.description);
        }

        await this.createIdeaButton.click();

        if (data.expect.globalError) {
            await expect(this.globalErrorMessage).toBeVisible();
        }

        if (data.expect.titleError || isTitleEmpty) {
            await expect(this.titleErrorMessage).toBeVisible();
        }

        if (data.expect.descriptionError || isDescriptionEmpty) {
            await expect(this.descriptionErrorMessage).toBeVisible();
        }
    }
}
