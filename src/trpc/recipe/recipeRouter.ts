import { db } from '@/db';
import { faker } from '@faker-js/faker';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from '../trpc';
import { computeIngredientsToCreateOrConnect } from './recipeUtil';

export const ingredientsArrayForRecipe = z.array(
  z.object({
    ingredient: z.object({
      name: z.string().min(1).max(50),
      unit: z.string().min(1).max(50),
    }),
    quantity: z.number().min(1),
  })
);

const createAndUpdateRecipeInput = z.object({
  title: z.string().min(3).max(50),
  description: z.string(),
  isPublic: z.boolean().default(false),
  timeInKitchen: z.number().min(0).int(),
  waitingTime: z.number().min(0).int(),
  numberOfPeople: z.number().min(1).int(),
  ingredients: ingredientsArrayForRecipe,
  steps: z.array(
    z.object({
      content: z.string().min(1),
    })
  ),
});

export const createRecipeInput = createAndUpdateRecipeInput;

export const updateRecipeInput = z.object({
  id: z.string(),
  ...createAndUpdateRecipeInput.shape,
});

export const generateRecipeInput = z.object({
  count: z.number(),
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

      const ingredientsAlreadyOnRecipe = await db.ingredientsOnRecipes.findMany(
        {
          where: {
            ingredient: {
              userId,
            },
          },
          include: {
            ingredient: true,
          },
        }
      );

      const { createIngredients, connectIngredients } =
        computeIngredientsToCreateOrConnect(
          existingIngredients,
          ingredientsAlreadyOnRecipe,
          input.ingredients,
          userId
        );

      const allIngredients = [...createIngredients, ...connectIngredients];

      const recipe = db.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          isPublic: input.isPublic,
          timeInKitchen: z.coerce.number().parse(input.timeInKitchen),
          waitingTime: z.coerce.number().parse(input.waitingTime),
          numberOfPeople: z.coerce.number().parse(input.numberOfPeople),
          userId,
          ingredients: {
            create: allIngredients,
          },
          steps: {
            create: input.steps.map((step) => ({
              content: step.content,
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

  getPublicRecipes: publicProcedure.query(async () => {
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
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;

      const recipe = await db.recipe.findFirst({
        where: {
          id: input.id,
          userId,
        },
        include: {
          ingredients: {
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

  getPublicRecipe: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const recipe = await db.recipe.findFirst({
        where: {
          id: input.id,
          isPublic: true,
        },
        include: {
          ingredients: {
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

  updateRecipe: privateProcedure
    .input(updateRecipeInput)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const recipeToUpdate = await db.recipe.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!recipeToUpdate)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Recipe not found' });

      if (recipeToUpdate?.userId !== userId)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to update this recipe',
        });

      const existingIngredients = await db.ingredient.findMany({
        where: {
          userId,
        },
      });

      const ingredientsAlreadyOnRecipe = await db.ingredientsOnRecipes.findMany(
        {
          where: {
            recipeId: input.id,
          },
          include: {
            ingredient: true,
          },
        }
      );

      const { createIngredients, connectIngredients } =
        computeIngredientsToCreateOrConnect(
          existingIngredients,
          ingredientsAlreadyOnRecipe,
          input.ingredients,
          userId
        );

      const allIngredients = [...createIngredients, ...connectIngredients];

      const recipe = await db.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          timeInKitchen: input.timeInKitchen,
          waitingTime: input.waitingTime,
          numberOfPeople: input.numberOfPeople,
          isPublic: input.isPublic,
          ingredients: {
            deleteMany: {
              ingredientId: {
                notIn: connectIngredients.map((i) => i.ingredient.connect.id),
              },
            },
            create: allIngredients,
          },
          steps: {
            deleteMany: {},
            create: input.steps.map((step) => ({
              content: step.content,
            })),
          },
        },
      });

      return recipe;
    }),

  deleteRecipe: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const recipeToDelete = await db.recipe.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!recipeToDelete)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Recipe not found' });

      if (recipeToDelete?.userId !== userId)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to delete this recipe',
        });

      await db.step.deleteMany({
        where: {
          recipeId: input.id,
        },
      });

      await db.recipeRating.deleteMany({
        where: {
          recipeId: input.id,
        },
      });

      await db.ingredientsOnRecipes.deleteMany({
        where: {
          recipeId: input.id,
        },
      });

      const recipeDeleted = await db.recipe.delete({
        where: {
          id: input.id,
        },
      });

      return recipeDeleted;
    }),
  generateRecipes: privateProcedure
    .input(generateRecipeInput)
    .mutation(async ({ ctx, input }) => {
      const { count } = input;
      const { userId } = ctx;

      // loop over recipes and create them one by one recipe[0], recipe[1], recipe[2]...
      for (let i = 0; i < count; i++) {
        await db.recipe.create({
          data: {
            title: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            isPublic: faker.datatype.boolean(),
            userId,
            timeInKitchen: faker.number.int({ min: 1, max: 60 }),
            waitingTime: faker.number.int({ min: 1, max: 60 }),
            numberOfPeople: faker.number.int({ min: 1, max: 10 }),
            ingredients: {
              create: Array.from({ length: 10 }, () => ({
                ingredient: {
                  create: {
                    name: faker.commerce.productName(),
                    unit: faker.science.unit().symbol,
                    userId,
                  },
                },
                quantity: faker.number.int({ min: 1, max: 10 }),
              })),
            },
            steps: {
              create: Array.from({ length: 20 }, () => ({
                content: faker.lorem.paragraph(),
              })),
            },
            ratings: {
              create: Array.from(
                { length: faker.number.int({ min: 1, max: 30 }) },
                () => ({
                  rating: faker.number.int({ min: 1, max: 5 }),
                  userId: faker.string.uuid(),
                })
              ),
            },
          },
        });
      }
    }),
});
