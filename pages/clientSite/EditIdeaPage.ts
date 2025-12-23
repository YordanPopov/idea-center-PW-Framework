import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the EditIdea Page.
 * @export
 * @class EditIdeaPage
 * @typedef {EditIdeaPage}
 */
export default class EditIdeaPage {
    constructor(private page: Page) {}

    get editIdeaPageHeading(): Locator {
        return this.page.getByRole('heading', {
            name: 'Edit the idea',
        });
    }

    get ideaTitle(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Title',
        });
    }

    get ideaPictureUrl(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Url',
        });
    }

    get ideaDescription(): Locator {
        return this.page.getByRole('textbox', {
            name: 'Describe your idea',
        });
    }

    get editButton(): Locator {
        return this.page.getByRole('button', { name: 'Edit' });
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
     * Edits an idea. Any of the fields can be optionally updated.
     * @param {object} params - Object with optional idea fields
     * @param {string} [params.title] - New title for the idea
     * @param {string} [params.imgUrl] - New image URL
     * @param {string} [params.description] - New description
     * @returns {Promise<void>} - Resolves when editing is complete.
     */
    async editIdea(params: {
        title?: string;
        imgUrl?: string;
        description?: string;
    }): Promise<void> {
        const { title, imgUrl, description } = params;

        if (title) {
            await this.ideaTitle.fill(title);
        }

        if (imgUrl) {
            await this.ideaPictureUrl.fill(imgUrl);
        }

        if (description) {
            await this.ideaDescription.fill(description);
        }

        await Promise.all([
            this.page.waitForResponse(
                (resp) =>
                    resp.url().includes('/Ideas/MyIdeas') &&
                    resp.status() === 200
            ),
            this.editButton.click(),
        ]);
        await expect(
            this.page.locator('.card-body > p', {
                hasText: description,
            })
        ).toBeVisible();
    }

    /**
     * Attempts to edit an idea with provided data and validates the expected errors
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
    async attemptToEditIdea(data: {
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
            await this.ideaTitle.clear();
            await this.ideaTitle.fill(data.title);
        }

        if (data.imgUrl) {
            await this.ideaPictureUrl.clear();
            await this.ideaPictureUrl.fill(data.imgUrl);
        }

        if (data.description) {
            await this.ideaDescription.clear();
            await this.ideaDescription.fill(data.description);
        }

        await this.editButton.click();

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
