[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/vlb2.svg)](https://uptime.betterstack.com/?utm_source=status_badge)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BHelpful_BHelpful&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BHelpful_BHelpful)
[![CodeQL](https://github.com/BHelpful/MomentMeal/actions/workflows/codeql.yml/badge.svg)](https://github.com/BHelpful/MomentMeal/actions/workflows/codeql.yml)
[![CodeScene Code Health](https://codescene.io/projects/27963/status-badges/code-health)](https://codescene.io/projects/27963)
[![CodeScene System Mastery](https://codescene.io/projects/27963/status-badges/system-mastery)](https://codescene.io/projects/27963)

# MomentMeal - A marketplace for food and recipes.

MomentMeal is a platform that connects food lovers and chefs. It allows users to discover new recipes, share their own, and modify existing ones to make it just right for them.

<div align="center">
    <img align="center" width="600" alt="Project Image" src="https://github.com/BHelpful/MomentMeal/assets/39928082/74cb09ba-d29d-4ab2-a361-5a31e7e392bd" />
</div>

</br>

<div align="center">
    <a href="https://discord.gg/KrFs324F6e">
        <img src="https://img.shields.io/discord/755802968602968187?color=5865F2&label=Discord&logo=discord&logoColor=white" alt="Discord Server" />
    </a>
</div>

# Getting started

## Pre-requisites

- Install pnpm globally `npm install -g pnpm`
- (Optional) Install Docker e.g., Docker Desktop for Windows or Docker Engine for Linux. See [Docker installation](https://docs.docker.com/get-docker/) for more information.
  - This is to have a local database for development. You can also use a remote database like the ones hosted by [Neon](https://neon.tech/)

### Clerk Dashboard Setup

For this app to work you need to setup clerk OAuth providers. You can find the social options under `User & Authentication / Social Connections` in the [Clerk Dashboard](https://dashboard.clerk.dev)

> Pr. default we are using Google, Facebook, and Discord so for best experience you should setup these in the Clerk Dashboard.

## Installation and setup

- Clone the repository
- Create local .env for the main app (./apps/web/.env). Do this by:
  - `cp apps/web/.env.example apps/web/.env`
  - And fill in the values
- Install dependencies `pnpm install` or just `pnpm i`
- Start the database `pnpm db:dev` or if using a provider like Neon, you can skip this step
- Push the database schema to the database
  - From apps/web: `pnpm prisma:push`
  - Or from the root: `pnpm run --filter=momentmeal prisma:push`
- Run the development server `pnpm dev`

## End-to-End Testing Setup

To set up end-to-end (e2e) tests with Docker and Clerk, follow these steps:

1. Ensure Docker is installed and running on your machine.
2. Start the Dockerized Postgres database:
   ```sh
   pnpm db:dev
   ```
3. Set up the environment variables for Clerk in `apps/web/.env`:
   ```sh
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   E2E_CLERK_USER_USERNAME=your-clerk-username
   E2E_CLERK_USER_PASSWORD=your-clerk-password
   ```
4. Run the e2e tests:
   ```sh
   pnpm e2e:ci
   ```

# Open Source

MomentMeal is an open source project. We welcome contributions from the community. There are many ways to contribute to the project, from writing tutorials or blog posts, submitting bug reports and feature requests or writing code which can be incorporated into MomentMeal itself. Here is a list of some of the ways you can contribute to the project:

- [Report bugs](https://github.com/BHelpful/MomentMeal/issues/new/choose) - If you find a bug, please report it in the issue tracker.
- [Suggest new features](https://github.com/BHelpful/MomentMeal/issues/new/choose) - If you have an idea for a new feature, please suggest it in the issue tracker.
- [Implement new features](https://github.com/BHelpful/MomentMeal/issues/new/choose) - If you want to implement a new feature, please create an issue in the issue tracker and describe the feature you want to implement. This will allow us to discuss the feature and make sure it fits with the project.
- [Improve code quality](https://github.com/BHelpful/MomentMeal#repo-health-information) - We use SonarCloud and CodeScene to measure the code quality of our project. You can help us improve the code quality by fixing bugs and vulnerabilities.
- Improve documentation - If you find any errors in the documentation or want to improve it, please contribute with a pull request.
- In the future, we will want to implement translations of the app. If you are interested in helping us with this, please contact us at [momentmeal@gmail.com](mailto:momentmeal@gmail.com).

## Get in contact with maintainers

If you have any questions or want to get in contact with the maintainers, you can reach out to us on Discord or by email at [momentmeal@gmail.com](mailto:momentmeal@gmail.com).

<div align="center">
    <a href="https://discord.gg/KrFs324F6e">
        <img src="https://img.shields.io/discord/755802968602968187?color=5865F2&label=Discord&logo=discord&logoColor=white" alt="Discord Server" />
    </a>
</div>

# Branching strategy

We are using two branches that are protected:

- `prod` - This is the main branch where all the code that is in production is located.
- `master` - This is the branch where all the code that is deployed to staging is located.
  - `master` should always be deployable to staging thereby also prod.
  - All changes from maintainers and contributers should go toward `master`.

All other branches are dev branches that are created from `master` and merged back into `master` when the development is done.

> **_NOTE:_** Dev branches meaning short-lived branches that are created for a specific feature or bug fix. If the feature cannot be completed in a short amount of time, it is recommended to surround the feature with a feature flag and merge the branch into `master` quickly to avoid merge conflicts.

# Deployment

## Staging ([staging.momentmeal.com](https://staging.momentmeal.com/))

The staging environment is automatically deployed when changes get to the `master` branch. This is done frequently, as all development goes here. Stating is used to test the state of master, to see if we are ready to deploy to prod with new features/improvements.

## Production ([momentmeal.com](https://momentmeal.com/))

The production environment is automatically deployed when changes get to the `prod` branch. There is no strict cadence for this, but it is done when we have a set of features/improvements that are ready to be released. It will also happen, that there is a bug in production we need to address, then a `hotfix/some-name` is made toward `prod` to solve the issue, directly deploying to prod. But this should not happen often

# Development

## UI Components

Since we are making use of the [Shadcn UI](https://ui.shadcn.com/docs) library, we have a set of components that are already made for us. This means that we can focus on the business logic and not the UI. If you need a component that is not yet in the `/components/ui` folder, take a look at [Shadcn UI](https://ui.shadcn.com/docs) and see if the component is available there. Then you should be able to from the `/apps/web` directory run `pnpm dlx shadcn-ui@latest add ???` replacing `???` with the relevant component. This will automatically install add the component to the `ui` folder.

If there is not yet a component in the Shadcn UI library, this typically means the component is a domain-specific component. These should be created in the `/components` folder, ideally in a relevant subfolder.

## Feature Flags

Create the feature flag in PostHog and use the feature flag in your code.

(Server rendered components) Follow the steps below to create a feature flag:

```TS
import PostHogClient from '<relative path to app/posthog.ts>';

export default async function Home() {
  const posthog = PostHogClient();

  const flagEnabled = await posthog.getFeatureFlag(
    'testFeature',
    <user distinct id>
  );
```

(Client rendered components) Follow the steps below to create a feature flag:

```TS
import { useFeatureFlagEnabled } from 'posthog-js/react'

function App() {
    const flagEnabled = useFeatureFlagEnabled('testFeature')

    if (flagEnabled) {
        // do something
    }
}
```

# [Project Board](https://github.com/orgs/BHelpful/projects/4/views/23)

For development management we are using [GitHub Projects](https://github.com/orgs/BHelpful/projects/4/views/23). In there you can see our backlog, issues sorted by priority and size.

## How the board is used

- [ **Main** ](https://github.com/orgs/BHelpful/projects/4/views/23): This is the main board where all issues that are ready to be picked up, or are in progress, are located.
- [ **Actions Needed** ](https://github.com/orgs/BHelpful/projects/4/views/25): This is where issues that are blocked or need more detail are located.
- [ **Good First Issue** ](https://github.com/orgs/BHelpful/projects/4/views/20): This is where issues that are good for new contributors are located.
  - Issues with the label `good first issue` are automatically added to this board.
- [ **Bugs** ](https://github.com/orgs/BHelpful/projects/4/views/19): This is where all bugs are located.
  - Issues with the label `bug` are automatically added to this board.

### As a contributor

Feel free to pick up any issue that is in the main board. If you are new to the project, you can start by looking at the [Good First Issue](https://github.com/orgs/BHelpful/projects/4/views/25) board.

In any case, if you have any questions, feel free to ask in the issue or in the Discord server, no matter what board the issue is in.

# Repo health information

Here is the current overview of the code health of the repository measured by:

- Sonarcloud: https://sonarcloud.io/summary/overall?id=BHelpful_BHelpful

## External links for development

- Clerk docs: https://clerk.com/docs
- Component library: https://ui.shadcn.com/docs
- Prisma docs: https://www.prisma.io/docs
- Tailwind CSS docs: https://tailwindcss.com/docs

## Web Info

The smallest width we will accommodate for the webpage is 240px.

# Credits

This project has taken inspiration from the following projects:

- https://github.com/sadmann7/skateshop
- https://github.com/joschan21/quill
  Both https://github.com/sadmann7 and https://github.com/joschan21 have done some awesome work, so go support them.
