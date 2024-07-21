[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/vlb2.svg)](https://uptime.betterstack.com/?utm_source=status_badge)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BHelpful_BHelpful&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BHelpful_BHelpful)
[![CodeQL](https://github.com/BHelpful/MomentMeal/actions/workflows/codeql.yml/badge.svg)](https://github.com/BHelpful/MomentMeal/actions/workflows/codeql.yml)
[![CodeScene Code Health](https://codescene.io/projects/27963/status-badges/code-health)](https://codescene.io/projects/27963)
[![CodeScene System Mastery](https://codescene.io/projects/27963/status-badges/system-mastery)](https://codescene.io/projects/27963)

# MomentMeal - A marketplace for food and recipes.

MomentMeal is a platform that connects food lovers and chefs. It allows users to discover new recipes, share their own, and even sell their homemade meals.

<div align="center">
    <img align="center" width="600" alt="Project Image" src="https://github.com/BHelpful/MomentMeal/assets/39928082/74cb09ba-d29d-4ab2-a361-5a31e7e392bd" />
</div>

</br>

# Open Source

MomentMeal is an open source project. We welcome contributions from the community. There are many ways to contribute to the project, from writing tutorials or blog posts, submitting bug reports and feature requests or writing code which can be incorporated into MomentMeal itself. Here is a list of some of the ways you can contribute to the project:

- [Report bugs](https://github.com/BHelpful/MomentMeal/issues/new/choose) - If you find a bug, please report it in the issue tracker.
- [Suggest new features](https://github.com/BHelpful/MomentMeal/issues/new/choose) - If you have an idea for a new feature, please suggest it in the issue tracker.
- [Implement new features](https://github.com/BHelpful/MomentMeal/issues/new/choose) - If you want to implement a new feature, please create an issue in the issue tracker and describe the feature you want to implement. This will allow us to discuss the feature and make sure it fits with the project.
- [Improve code quality](https://github.com/BHelpful/MomentMeal#repo-health-information) - We use SonarCloud and CodeScene to measure the code quality of our project. You can help us improve the code quality by fixing bugs and vulnerabilities.
- Improve documentation - If you find any errors in the documentation or want to improve it, please contribute with a pull request.
- In the future, we will want to implement translations of the app. If you are interested in helping us with this, please contact us at [momentmeal@gmail.com](mailto: 'momentmeal@gmail.com').

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
- Create local .env `cp .env.example .env` and fill in the values
- Install dependencies `pnpm install` or just `pnpm i`
- Start the database `pnpm db:dev` or if using a provider like Neon, you can skip this step
- Run `pnpm db:push` to push the database schema to the database
- Run the development server `pnpm dev`

# Development

## Feature Flags

Create the feature flag in PostHog and use the feature flag in your code.

(Server rendered components) Follow the steps below to create a feature flag:

```TS
import PostHogClient from '<relative path to app/posthog.ts>';

export default async function Home() {
  const posthog = PostHogClient();

  const flagEnabled = await posthog.getFeatureFlag(
    'testFeature',
    'user distinct id'
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

For development management we are using [GitHub Projects](https://github.com/orgs/BHelpful/projects/4/views/23). In there you can see our backlog, issues sorted by priority and size. We are also working on creating a roadmap in there.

# Repo health information

Here is the current overview of the code health of the repository measured by:

- Sonarcloud: https://sonarcloud.io/summary/overall?id=BHelpful_BHelpful

## External links for development

- Clerk docs: https://clerk.com/docs
- Component library: https://ui.shadcn.com/docs
- Prisma docs: https://www.prisma.io/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- tRPC docs: https://trpc.io/docs

## Web Info

The smallest width we will accommodate for the webpage is 240px.

# Credits

This project has taken inspiration from the following projects:

- https://github.com/sadmann7/skateshop
- https://github.com/joschan21/quill
  Both https://github.com/sadmann7 and https://github.com/joschan21 have done some awesome work, so go support them.
