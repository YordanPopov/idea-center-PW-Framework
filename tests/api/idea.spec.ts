import { CreateIdeaResponse, IdeaResponse } from '@fixtures/api/types-guards';
import {
    CreateIdeaResponseSchema,
    IdeaResponseSchema,
} from '@fixtures/api/schemas';
import { expect, test } from '@fixtures/pom/test-options';
import ideaData from '../../test-data/ideaData.json';

test.describe('Verify CRUD Idea', () => {
    test(
        'Verify Create/Read/Update/Delete an Idea',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            let ideaID: string;

            await test.step('Verify Create an Idea', async () => {
                const { status, body } = await apiRequest<CreateIdeaResponse>({
                    method: 'POST',
                    url: 'Idea/Create',
                    baseUrl: process.env.API_URL,
                    body: ideaData.create,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(CreateIdeaResponseSchema.parse(body)).toBeTruthy();
                expect(body.msg).toContain('Successfully created!');
            });

            await test.step('Verify Read an Idea', async () => {
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

            await test.step('Verify Update an Idea', async () => {
                const { status, body } = await apiRequest<CreateIdeaResponse>({
                    method: 'PUT',
                    url: `Idea/Edit?ideaId=${ideaID}`,
                    baseUrl: process.env.API_URL,
                    body: ideaData.update,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(CreateIdeaResponseSchema.parse(body)).toBeTruthy();
                expect(body.msg).toContain('Edited successfully');
            });

            await test.step('Verify Read an updated Idea', async () => {
                const { status, body } = await apiRequest<IdeaResponse>({
                    method: 'GET',
                    url: 'Idea/All',
                    baseUrl: process.env.API_URL,
                    headers: process.env.ACCESS_TOKEN,
                });

                expect(status).toBe(200);
                expect(IdeaResponseSchema.parse(body)).toBeTruthy();
                expect(body[0].title).toBe(ideaData.update.title);
                ideaID = body[0].id;
            });

            await test.step('Verify Delete an Idea', async () => {
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
