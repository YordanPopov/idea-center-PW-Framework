import { CreateIdeaResponse, IdeaResponse } from '@fixtures/api/types-guards';
import {
    CreateIdeaResponseSchema,
    IdeaResponseSchema,
} from '@fixtures/api/schemas';
import { expect, test } from '@fixtures/pom/test-options';
import { validIdeaData as idea } from '@test-data/ideaData';

test.describe('IDEA | API lifecycle', () => {
    test(
        'IDEA | API | create -> read -> update -> delete',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            let ideaID: string;

            await test.step('Create an Idea', async () => {
                const { status, body } = await apiRequest<CreateIdeaResponse>({
                    method: 'POST',
                    url: 'Idea/Create',
                    baseUrl: process.env.API_URL,
                    body: {
                        title: idea.title,
                        url: idea.url,
                        description: idea.description,
                    },
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(CreateIdeaResponseSchema.parse(body)).toBeTruthy();
                expect(body.msg).toContain('Successfully created!');
            });

            await test.step('Read an Idea', async () => {
                const { status, body } = await apiRequest<IdeaResponse>({
                    method: 'GET',
                    url: 'Idea/All',
                    baseUrl: process.env.API_URL,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(IdeaResponseSchema.parse(body)).toBeTruthy();
                ideaID = body[0].id;
            });

            await test.step('Update an Idea', async () => {
                const { status, body } = await apiRequest<CreateIdeaResponse>({
                    method: 'PUT',
                    url: `Idea/Edit?ideaId=${ideaID}`,
                    baseUrl: process.env.API_URL,
                    body: {
                        title: `UPDATED - ${idea.title}`,
                        url: idea.url,
                        description: `UPDATED - ${idea.description}`,
                    },
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(CreateIdeaResponseSchema.parse(body)).toBeTruthy();
                expect(body.msg).toContain('Edited successfully');
            });

            await test.step('Read an updated Idea', async () => {
                const { status, body } = await apiRequest<IdeaResponse>({
                    method: 'GET',
                    url: 'Idea/All',
                    baseUrl: process.env.API_URL,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(IdeaResponseSchema.parse(body)).toBeTruthy();
                expect(body[0].title).toContain(`UPDATED`);
                ideaID = body[0].id;
            });

            await test.step('Delete an Idea', async () => {
                const { status } = await apiRequest({
                    method: 'DELETE',
                    url: `Idea/Delete?IdeaId=${ideaID}`,
                    baseUrl: process.env.API_URL,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
            });

            await test.step('Verify the Idea is deleted', async () => {
                const { status, body } = await apiRequest<IdeaResponse>({
                    method: 'GET',
                    url: 'Idea/All',
                    baseUrl: process.env.API_URL,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(IdeaResponseSchema.parse(body)).toHaveLength(0);
            });
        }
    );
});
