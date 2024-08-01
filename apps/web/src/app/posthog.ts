import { PostHog } from 'posthog-node';

// This is for server-side usage, as the js library is not compatible with SSR

export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  return posthogClient;
}
