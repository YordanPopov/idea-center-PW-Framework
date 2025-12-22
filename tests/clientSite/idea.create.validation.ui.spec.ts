import { test } from '@fixtures/pom/test-options';
import { invalidIdeas } from '@test-data/ideaData';

test.describe('Create Idea - Negative Scenarios (DDT)', () => {
    for (const invalidIdea of invalidIdeas) {
        test(
            `Attempt to Create Idea with ${invalidIdea.name}`,
            { tag: ['@negative', '@regression'] },
            async ({ homePage, navBar, createIdeaPage }) => {
                await homePage.navigateToHomePage();

                await navBar.openCreateIdeaPage();

                await createIdeaPage.attemptToCreateIdea(invalidIdea);
            }
        );
    }
});
