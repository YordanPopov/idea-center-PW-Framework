import { IdeaResponseSchema } from '@fixtures/api/schemas';
import { IdeaResponse } from '@fixtures/api/types-guards';
import { test, expect } from '@fixtures/pom/test-options';
import { validIdeaData as idea } from '@test-data/ideaData';

test.describe('IDEA | E2E lifecycle', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test(
        'IDEA | E2E | Create, Edit and Delete an Idea',
        { tag: '@Smoke' },
        async ({ navBar, createIdeaPage, myIdeasPage, editIdeaPage }) => {
            await test.step('Verify Create an Idea', async () => {
                await navBar.openCreateIdeaPage();

                await createIdeaPage.createIdea({
                    title: idea.title,
                    imgUrl: idea.url,
                    description: idea.description,
                });
            });

            await test.step('Verify Edit an Idea', async () => {
                await myIdeasPage.openEditIdeaPage();

                await editIdeaPage.editIdea({
                    title: `UPDATED ${idea.title}`,
                    description: `UPDATED ${idea.description}`,
                });
            });

            await test.step('Verify Delete an Idea', async () => {
                await myIdeasPage.deleteIdea();
            });
        }
    );

    test.afterAll(async ({ apiRequest }) => {
        await test.step('Cleanup: Delete any remaning ideas', async () => {
            try {
                const { status, body } = await apiRequest<IdeaResponse>({
                    method: 'GET',
                    url: 'Idea/All',
                    baseUrl: process.env.API_URL,
                    headers: process.env.ACCESS_TOKEN,
                });

                if (status === 200 && body && Array.isArray(body)) {
                    const ideas = IdeaResponseSchema.parse(body);

                    for (const idea of ideas) {
                        const deleteResponse = await apiRequest({
                            method: 'DELETE',
                            url: `Idea/Delete?IdeaId=${idea.id}`,
                            baseUrl: process.env.API_URL,
                            headers: process.env.ACCESS_TOKEN,
                        });

                        expect(deleteResponse.status).toBe(200);
                    }
                }
            } catch (error) {
                await test.info().attach('cleanup-error', {
                    body: String(error),
                });
            }
        });
    });
});
