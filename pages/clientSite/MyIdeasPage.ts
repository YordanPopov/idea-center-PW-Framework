import { Page, Locator, expect } from "@playwright/test";
/**
 * This is the page object for the MyIdeas Page.
 * @export
 * @class MyIdeasPage
 * @typedef {MyIdeasPage}
 */
export class MyIdeasPage {
  constructor(private page: Page) {}

  get noIdeasMessage(): Locator {
    return this.page.getByText("No Ideas yet!");
  }

  get ideaTitle(): Locator {
    return this.page.locator(".card-body > p").last();
  }

  get viewButton(): Locator {
    return this.page.getByRole("link", {
      name: "View",
    });
  }

  get editButton(): Locator {
    return this.page.getByRole("link", {
      name: "Edit",
    });
  }

  get deleteButton(): Locator {
    return this.page.getByRole("link", {
      name: "Delete",
    });
  }

  async deleteIdea(): Promise<void> {
    await this.deleteButton.click();

    await expect(this.noIdeasMessage).toBeVisible();
  }
}
