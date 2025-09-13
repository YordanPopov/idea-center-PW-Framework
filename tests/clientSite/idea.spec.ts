import { test } from "../../fixtures/pom/test-options";

test.describe("Verify Create/Edit/Delete an Idea", () => {
  const ideaTitle = "test title";
  const ideaDesc = "test description";

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHomePage();
  });

  test(
    "Verify Create/Edit/Delete an Idea",
    { tag: "@Sanity" },
    async ({ navPage, createIdeaPage, myIdeasPage, editIdeaPage }) => {
      await test.step("Verify Create an Idea", async () => {
        await navPage.openCreateIdeaPage();

        await createIdeaPage.createIdea({
          title: ideaTitle,
          description: ideaDesc,
        });
      });

      await test.step("Verify Edit an Idea", async () => {
        await myIdeasPage.openEditIdeaPage();

        await editIdeaPage.editIdea({
          title: `UPDATED ${ideaTitle}`,
          description: `UPDATED ${ideaDesc}`,
        });
      });

      await test.step("Verify Delete an Idea", async () => {
        await myIdeasPage.deleteIdea();
      });
    }
  );
});
