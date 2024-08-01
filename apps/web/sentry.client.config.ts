// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://d01ddd6d6028d8ab5085b8f6685ef693@o4507545200820224.ingest.de.sentry.io/4507545205014608',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      autoInject: false,
      showBranding: false,
      colorScheme: 'system',
      themeDark: {
        background: '#0B0C0E',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      },
      themeLight: {
        background: '#E8E9E9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      },
    }),
  ],
});
