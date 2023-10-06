import { recipeRouter } from './recipe/recipeRouter';
import { router } from './trpc';

export const appRouter = router({
  recipe: recipeRouter,
});

export type AppRouter = typeof appRouter;
