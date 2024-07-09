'use client';

// 👉 Import the necessary Clerk hooks
import { useAuth, useUser } from '@clerk/nextjs';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // 👉 Add the hooks into the component
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  useEffect(() => {
    // 👉 Check the sign-in status and user info,
    //    and identify the user if they aren't already
    if (isSignedIn && userId && user && !posthog._isIdentified()) {
      // 👉 Identify the user
      posthog.identify(userId, {
        email: user.primaryEmailAddress?.emailAddress,
        username: user.username,
      });
    }
    // 👉 Reset the user if they sign out
    if (!isSignedIn && posthog._isIdentified()) {
      posthog.reset();
    }
  }, [posthog, userId, user, isSignedIn]);

  return null;
}
