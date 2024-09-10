export const unknownError =
  'An unknown error occurred. Please try again later.';

export const redirects = {
  toLogin: '/signin',
  toSignup: '/signup',
  afterLogin: '/dashboard/recipes',
  afterLogout: '/',
  toVerify: '/verify-email',
  afterVerify: '/dashboard/recipes',
} as const;
