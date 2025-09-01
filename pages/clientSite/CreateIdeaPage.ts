import { Page, Locator, expect } from "@playwright/test";
/**
 * This is the page object for the CreateIdeaPage Page.
 * @export
 * @class CreateIdeaPage
 * @typedef {CreateIdeaPage}
 */
export class CreateIdeaPage {
  constructor(private page: Page) {}

  get createIdeaHeading(): Locator {
    return this.page.getByRole("paragraph", {
      name: "Create new idea",
    });
  }

  get ideaTitleInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Title",
    });
  }

  get ideaPictureInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Url",
    });
  }

  get ideaDescriptionInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Description",
    });
  }

  get createIdeaButton(): Locator {
    return this.page.getByRole("button", {
      name: "Create",
    });
  }

  async createIdea(
    ideaTitle: string,
    description: string,
    imgUrl?: string
  ): Promise<void> {
    await this.ideaTitleInput.fill(ideaTitle);
    await this.ideaDescriptionInput.fill(description);

    if (imgUrl) {
      await this.ideaPictureInput.fill(imgUrl);
    }
    await this.createIdeaButton.click();
    await this.page.waitForResponse(`${process.env.URL}/Ideas/MyIdeas`);
  }
}
