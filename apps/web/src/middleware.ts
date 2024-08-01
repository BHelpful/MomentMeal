import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { env } from './env.mjs';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/dashboard/account(.*)',
  '/signout',
]);

export default clerkMiddleware((auth, req) => {
  // Restrict dashboard routes to signed in users
  if (isProtectedRoute(req)) {
    auth().protect({
      unauthenticatedUrl: env.NEXT_PUBLIC_APP_URL + '/signin',
      unauthorizedUrl: env.NEXT_PUBLIC_APP_URL + '/signin',
    });
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
