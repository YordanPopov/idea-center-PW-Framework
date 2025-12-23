import { test as base } from '@playwright/test';

import HomePage from '@pages/clientSite/HomePage';
import NavBar from '@pages/clientSite/NavBar';
import LoginPage from '@pages/clientSite/LoginPage';
import CreateIdeaPage from '@pages/clientSite/CreateIdeaPage';
import MyIdeasPage from '@pages/clientSite/MyIdeasPage';
import EditIdeaPage from '@pages/clientSite/EditIdeaPage';

export type FrameworkFixtures = {
    homePage: HomePage;

    navBar: NavBar;

    loginPage: LoginPage;

    createIdeaPage: CreateIdeaPage;

    myIdeasPage: MyIdeasPage;

    editIdeaPage: EditIdeaPage;
};

export const test = base.extend<FrameworkFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    navBar: async ({ page }, use) => {
        await use(new NavBar(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    createIdeaPage: async ({ page }, use) => {
        await use(new CreateIdeaPage(page));
    },

    myIdeasPage: async ({ page }, use) => {
        await use(new MyIdeasPage(page));
    },

    editIdeaPage: async ({ page }, use) => {
        await use(new EditIdeaPage(page));
    },
});

export { expect } from '@playwright/test';
