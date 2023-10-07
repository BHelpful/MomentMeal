import { db } from '@/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from '../trpc';
import { computeIngredientsToCreateOrConnect } from './createRecipeUtil';

export const createRecipeInput = z.object({
  title: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      unit: z.string().optional(),
    })
  ),
  steps: z.array(z.string()),
});

export const recipeRouter = router({
  createRecipe: privateProcedure
    .input(createRecipeInput)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const existingIngredients = await db.ingredient.findMany({
        where: {
          userId,
        },
      });

      const { createIngredients, connectIngredients } =
        computeIngredientsToCreateOrConnect(existingIngredients, input, userId);

      const allIngredients = [...createIngredients, ...connectIngredients];

      const recipe = db.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          isPublic: input.isPublic,
          userId,
          ingredients: {
            create: allIngredients,
          },
          steps: {
            create: input.steps.map((step) => ({
              content: step,
            })),
          },
        },
      });

      return recipe;
    }),

  getRecipes: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.recipe.findMany({
      where: {
        userId: userId,
      },
      include: {
        ratings: true,
      },
    });
  }),

  getPublicRecipes: publicProcedure.query(async ({ ctx }) => {
    const recipes = await db.recipe.findMany({
      where: {
        isPublic: true,
      },
      include: {
        ratings: true,
      },
    });

    return recipes;
  }),

  getRecipe: privateProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;

      const recipe = await db.recipe.findFirst({
        where: {
          id: input.id,
          userId,
        },
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
          steps: true,
          ratings: true,
        },
      });

      if (!recipe) throw new TRPCError({ code: 'NOT_FOUND' });

      return recipe;
    }),

  getPublicRecipe: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const recipe = await db.recipe.findFirst({
        where: {
          id: input.id,
          isPublic: true,
        },
        include: {
          ingredients: {
            // TODO: Figure out why it is nessesary to use select avoiding getting the assignedAt field
            // 	Types of property assignedAt are incompatible.
            // Type is Date not assignable to type string
            // Might be related to a trpc bug with inconsistent types between `Awaited<
            // ReturnType<(typeof serverClient)['recipe']['getPublicRecipe']>` and const recipe = trpc.recipe.getPublicRecipe.useQuery(
            //   { id },
            //   {
            //     initialData: initialRecipe,
            //     refetchOnMount: false,
            //     refetchOnReconnect: false,
            //   }
            // );
            // In recipeView.tsx
            select: {
              ingredient: true,
              quantity: true,
            },
          },
          steps: true,
          ratings: true,
        },
      });

      if (!recipe) throw new TRPCError({ code: 'NOT_FOUND' });

      return recipe;
    }),
});
