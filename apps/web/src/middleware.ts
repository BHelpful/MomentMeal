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
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|api\\/health|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes except health check
    '/api((?!/health))(.*)',
  ],
};
