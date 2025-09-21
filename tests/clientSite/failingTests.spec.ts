import { test, expect } from '../../fixtures/pom/test-options';

test('Failing API test', { tag: '@Api' }, async ({ homePage }) => {
    await homePage.navigateToHomePage();

    expect(2).toBe(3);
});

test('Failing Smoke test', { tag: '@Smoke' }, async ({ homePage }) => {
    await homePage.navigateToHomePage();

    expect(2).toBe(3);
});
