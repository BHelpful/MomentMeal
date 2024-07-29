import { env } from '@/env.mjs';
import { appRouter } from '@/trpc';
import { httpBatchLink } from '@trpc/client';

export const trpcApiUrl = new URL('/api/trpc', env.NEXT_PUBLIC_APP_URL);

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: trpcApiUrl.toString(),
    }),
  ],
});
