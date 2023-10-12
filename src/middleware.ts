import { clerkClient } from '@clerk/nextjs';
import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    '/',
    '/signin(.*)',
    '/signup(.*)',
    '/sso-callback(.*)',
    '/recipes(.*)',
    '/recipe(.*)',
    '/email-preferences(.*)',
    '/blog(.*)',
    '/about(.*)',
    '/contact(.*)',
    '/terms(.*)',
    '/privacy(.*)',
    '/api(.*)',
    '/pricing(.*)',
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      const url = new URL(req.nextUrl.origin);
      url.pathname = '/signin';
      url.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(url);
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error('User not found.');
    }

    // If the user doesn't have a role, set it to user
    if (!user.privateMetadata.role) {
      type UserRole = 'user';

      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: 'user' satisfies UserRole,
        },
      });
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
