import { currentUser } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir';

type Meta = {
  span: string;
};

const t = initTRPC.meta<Meta>().create({ isServer: true });
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

// TODO: Convert existing pages ruoter procedures to server actions as we use the app router.
export const publicProcedureAction = t.procedure.experimental_caller(
  experimental_nextAppDirCaller({
    pathExtractor: ({ meta }) => (meta as Meta).span,
  })
);
export const privateProcedureAction = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as Meta).span,
    })
  )
  .use(isAuth);
