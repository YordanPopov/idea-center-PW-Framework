# Idea Center Playwright Framework

Automated **end-to-end** and **API** testing framework built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## 🧰 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation & Local Setup](#installation--local-setup)
- [Test Commands](#test-commands)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Secrets & Environment Variables](#secrets--environment-variables)
- [Reports & GitHub Pages](#reports--github-pages)
- [Code Style & Linting](#code-style--linting)
- [Best Practices](#best-practices)

---

## Overview

This project provides a reusable Playwright framework for testing the **Idea Center** application.

It covers:

- UI tests with Playwright (Page Object Model for scalability)
- API testing
- Smoke tests
- Report generation (Blob + HTML)
- CI/CD pipeline with **GitHub Actions** for automated execution and publishing test reports

---

## Project Structure

/
├─ fixtures/ # fixtures, helpers (API, schemas, types)
├─ pages/ # Page Object Model (UI objects)
├─ tests/ # test files (UI + API)
├─ .github/workflows/ # GitHub Actions workflows
├─ .github/actions/ # custom composite actions (setup, report)
├─ playwright.config.ts
├─ tsconfig.json
├─ package.json
├─ README.md

## Requirements

- Node.js (version 18 or later)
- Playwright with browsers installed
- Git
- Access to the backend API and application under test

---

## Installation & Local Setup

Clone the repository and install dependencies:

- Clone the repository:

```bash
git clone https://github.com/YordanPopov/idea-center-PW-Framework.git
cd idea-center-PW-Framework
```

- Install dependencies:

```bash
npm install
```

- Create .env or env.testing file with required variables:

```bash
API_URL=https://your-api-url
URL=https://your-ui-url
EMAIL=youruser@example.com
PASSWORD=yourpassword
USER_NAME=yourusername
```

---

## Test Commands

```bash
# Run all tests
npm run testing
# Run smoke tests only
npm run smoke
# Run API tests only
npm run api
```

---

## CI/CD with GitHub Actions

The workflows are triggered:
-on push to main
-manually with workflow_dispatch

Pipeline steps:

1.Setup → Node.js, Playwright, dependencies
2.Run smoke tests and API tests
3.Upload blob reports
4.Merge into a single HTML report
5.Publish the HTML report to GitHub Pages

---

## Secrets & Environment Variables

The following secrets must be set in GitHib Repository Settings > Secrets > Actions

| Secret      | Description                                  |
| ----------- | -------------------------------------------- |
| `API_URL`   | Base API URL                                 |
| `URL`       | Base UI URL                                  |
| `EMAIL`     | User email for login / API authentication    |
| `PASSWORD`  | User password for login / API authentication |
| `USER_NAME` | (Optional) username for UI tests             |

---

## Reports & GitHub Pages

- Playwright tests generate blob reports (--reporter=blob)
- Blob files are merged into a single HTML report:

```bash
npx playwright merge-reports --reporter html ./all-blob-reports
```

---

## Code Style & Linting

- Written in TypeScript
- Uses ESLint + Prettier
- Rules:
    - Avoid console.log / console.warn → use Playwright test.info().attach for logs
    - Avoid conditional test execution (e.g., if logic that skips assertions)
    - Enforce LF line endings via .editorconfig and .gitattributes

---

## Best Practices

- Keep fixtures (API, schemas, helpers) and Page Objects clean and modular
- Use tags (@Smoke, @Api) to group and run subsets of tests
- Always clean up test data in afterAll hooks to keep environments stable
- Configure the workflow to always upload reports, even on successful runs
