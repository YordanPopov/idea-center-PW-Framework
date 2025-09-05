import { Page, Locator, expect } from "@playwright/test";
/**
 * This is the page object for the EditIdeaPage Page.
 * @export
 * @class EditIdeaPage
 * @typedef {EditIdeaPage}
 */
export class EditIdeaPage {
  constructor(private page: Page) {}

  get editIdeaPageHeading(): Locator {
    return this.page.getByRole("heading", {
      name: "Edit the idea",
    });
  }

  get ideaTitle(): Locator {
    return this.page.getByRole("textbox", {
      name: "Title",
    });
  }

  get ideaPictureUrl(): Locator {
    return this.page.getByRole("textbox", {
      name: "Url",
    });
  }

  get ideaDescription(): Locator {
    return this.page.getByRole("textbox", {
      name: "Describe your idea",
    });
  }

  get editButton(): Locator {
    return this.page.getByRole("button", { name: "Edit" });
  }

  /**
   * Edits an idea. Any of the fields can be optionally updated.
   *
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
        (resp) => resp.url().includes("/Ideas/MyIdeas") && resp.status() === 200
      ),
      this.editButton.click(),
    ]);
    await expect(
      this.page.locator(".card-body > p", {
        hasText: description,
      })
    ).toBeVisible();
  }
}
