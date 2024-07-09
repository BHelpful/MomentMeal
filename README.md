[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BHelpful_BHelpful&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BHelpful_BHelpful)
[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/vlb2.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

# MomentMeal - A marketplace for food and recipes.

Built with the Next.js App Router, tRPC, TypeScript, Prisma & Tailwind

![Project Image](https://github.com/BHelpful/MomentMeal/assets/39928082/74cb09ba-d29d-4ab2-a361-5a31e7e392bd)

# Usage

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

# Credits

This project has taken inspiration from the following projects:

- https://github.com/sadmann7/skateshop
- https://github.com/joschan21/quill
  Both https://github.com/sadmann7 and https://github.com/joschan21 have done some awesome work, so go support them.
