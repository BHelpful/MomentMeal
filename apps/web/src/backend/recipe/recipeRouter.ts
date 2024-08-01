'use server';

import { db } from '@/db';
import {
  action,
  ACTION_ERROR_CODE_KEY,
  ActionError,
  authAction,
} from '@/lib/safe-action';
import { faker } from '@faker-js/faker';
import { z } from 'zod';
import {
  createRecipeInput,
  generateRecipeInput,
  updateRecipeInput,
} from './recipeDTOs';
import { computeIngredientsToAddAndKeep } from './recipeUtil';

// TODO: move validation schemas to a separate file so they can be exported, as can only export async functions from use server file.

export const createRecipe = authAction
  .metadata({ actionName: 'createRecipe' })
  .schema(createRecipeInput)
  .action(async ({ parsedInput: input, ctx }) => {
    const { userId } = ctx;

    const existingIngredients = await db.ingredient.findMany({
      where: {
        userId,
      },
    });

    const ingredientsAlreadyOnRecipe = await db.ingredientsOnRecipes.findMany({
      where: {
        ingredient: {
          userId,
        },
      },
      include: {
        ingredient: true,
      },
    });

    const { ingredientsToAdd } = computeIngredientsToAddAndKeep(
      existingIngredients,
      ingredientsAlreadyOnRecipe,
      input.ingredients,
      userId
    );

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
          create: ingredientsToAdd,
        },
        steps: {
          create: input.steps.map((step) => ({
            content: step.content,
          })),
        },
      },
    });

    return recipe;
  });

export const getRecipes = authAction
  .metadata({ actionName: 'getRecipes' })
  .action(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.recipe.findMany({
      where: {
        userId: userId,
      },
      include: {
        ratings: true,
      },
    });
  });

export const getPublicRecipes = action
  .metadata({ actionName: 'getPublicRecipes' })
  .action(async () => {
    const recipes = await db.recipe.findMany({
      where: {
        isPublic: true,
      },
      include: {
        ratings: true,
      },
    });

    return recipes;
  });

export const getRecipe = authAction
  .metadata({ actionName: 'getRecipe' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: input, ctx }) => {
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

    if (!recipe)
      throw new ActionError({ code: ACTION_ERROR_CODE_KEY.NOT_FOUND });

    return recipe;
  });

export const getPublicRecipe = action
  .metadata({ actionName: 'getPublicRecipe' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: input }) => {
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

    if (!recipe)
      throw new ActionError({ code: ACTION_ERROR_CODE_KEY.NOT_FOUND });

    return recipe;
  });

export const updateRecipe = authAction
  .metadata({ actionName: 'updateRecipe' })
  .schema(updateRecipeInput)
  .action(async ({ parsedInput: input, ctx }) => {
    const { userId } = ctx;

    const recipeToUpdate = await db.recipe.findFirst({
      where: {
        id: input.id,
      },
    });

    if (!recipeToUpdate)
      throw new ActionError({
        code: ACTION_ERROR_CODE_KEY.NOT_FOUND,
        message: 'Recipe not found',
      });

    if (recipeToUpdate?.userId !== userId)
      throw new ActionError({
        code: ACTION_ERROR_CODE_KEY.UNAUTHORIZED,
        message: 'You are not authorized to update this recipe',
      });

    const existingIngredients = await db.ingredient.findMany({
      where: {
        userId,
      },
    });

    const ingredientsAlreadyOnRecipe = await db.ingredientsOnRecipes.findMany({
      where: {
        recipeId: input.id,
      },
      include: {
        ingredient: true,
      },
    });

    const { ingredientsToAdd, ingredientIDsToKeep, ingredientsToUpdate } =
      computeIngredientsToAddAndKeep(
        existingIngredients,
        ingredientsAlreadyOnRecipe,
        input.ingredients,
        userId
      );

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
              notIn: ingredientIDsToKeep,
            },
          },
          create: ingredientsToAdd,
          updateMany: ingredientsToUpdate,
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
  });

export const deleteRecipe = authAction
  .metadata({ actionName: 'deleteRecipe' })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: input, ctx }) => {
    const { userId } = ctx;

    const recipeToDelete = await db.recipe.findFirst({
      where: {
        id: input.id,
      },
    });

    if (!recipeToDelete)
      throw new ActionError({
        code: ACTION_ERROR_CODE_KEY.NOT_FOUND,
        message: 'Recipe not found',
      });

    if (recipeToDelete?.userId !== userId)
      throw new ActionError({
        code: ACTION_ERROR_CODE_KEY.UNAUTHORIZED,
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
  });

export const generateRecipes = authAction
  .metadata({ actionName: 'generateRecipes' })
  .schema(generateRecipeInput)
  .action(async ({ parsedInput: input, ctx }) => {
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
            create: Array.from({ length: 7 }, () => ({
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
            create: Array.from({ length: 7 }, () => ({
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
  });

// const recipeRouter = router({
//   createRecipe: privateProcedure
//     .input(createRecipeInput)
//     .mutation(async ({ ctx, input }) => {
//       const { userId } = ctx;
//
//       const existingIngredients = await db.ingredient.findMany({
//         where: {
//           userId,
//         },
//       });
//
//       const ingredientsAlreadyOnRecipe = await db.ingredientsOnRecipes.findMany(
//         {
//           where: {
//             ingredient: {
//               userId,
//             },
//           },
//           include: {
//             ingredient: true,
//           },
//         }
//       );
//
//       const { ingredientsToAdd } = computeIngredientsToAddAndKeep(
//         existingIngredients,
//         ingredientsAlreadyOnRecipe,
//         input.ingredients,
//         userId
//       );
//
//       const recipe = db.recipe.create({
//         data: {
//           title: input.title,
//           description: input.description,
//           isPublic: input.isPublic,
//           timeInKitchen: z.coerce.number().parse(input.timeInKitchen),
//           waitingTime: z.coerce.number().parse(input.waitingTime),
//           numberOfPeople: z.coerce.number().parse(input.numberOfPeople),
//           userId,
//           ingredients: {
//             create: ingredientsToAdd,
//           },
//           steps: {
//             create: input.steps.map((step) => ({
//               content: step.content,
//             })),
//           },
//         },
//       });
//
//       return recipe;
//     }),
//
//   getRecipes: privateProcedure.query(async ({ ctx }) => {
//     const { userId } = ctx;
//
//     return await db.recipe.findMany({
//       where: {
//         userId: userId,
//       },
//       include: {
//         ratings: true,
//       },
//     });
//   }),
//
//   getPublicRecipes: publicProcedure.query(async () => {
//     const recipes = await db.recipe.findMany({
//       where: {
//         isPublic: true,
//       },
//       include: {
//         ratings: true,
//       },
//     });
//
//     return recipes;
//   }),
//
//   getRecipe: privateProcedure
//     .input(z.object({ id: z.string() }))
//     .query(async ({ ctx, input }) => {
//       const { userId } = ctx;
//
//       const recipe = await db.recipe.findFirst({
//         where: {
//           id: input.id,
//           userId,
//         },
//         include: {
//           ingredients: {
//             select: {
//               ingredient: true,
//               quantity: true,
//             },
//           },
//           steps: true,
//           ratings: true,
//         },
//       });
//
//       if (!recipe) throw new ActionError({ code: 'NOT_FOUND' });
//
//       return recipe;
//     }),
//
//   getPublicRecipe: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(async ({ input }) => {
//       const recipe = await db.recipe.findFirst({
//         where: {
//           id: input.id,
//           isPublic: true,
//         },
//         include: {
//           ingredients: {
//             select: {
//               ingredient: true,
//               quantity: true,
//             },
//           },
//           steps: true,
//           ratings: true,
//         },
//       });
//
//       if (!recipe) throw new ActionError({ code: 'NOT_FOUND' });
//
//       return recipe;
//     }),
//
//   updateRecipe: privateProcedure
//     .input(updateRecipeInput)
//     .mutation(async ({ ctx, input }) => {
//       const { userId } = ctx;
//
//       const recipeToUpdate = await db.recipe.findFirst({
//         where: {
//           id: input.id,
//         },
//       });
//
//       if (!recipeToUpdate)
//         throw new ActionError({ code: 'NOT_FOUND', message: 'Recipe not found' });
//
//       if (recipeToUpdate?.userId !== userId)
//         throw new ActionError({
//           code: 'UNAUTHORIZED',
//           message: 'You are not authorized to update this recipe',
//         });
//
//       const existingIngredients = await db.ingredient.findMany({
//         where: {
//           userId,
//         },
//       });
//
//       const ingredientsAlreadyOnRecipe = await db.ingredientsOnRecipes.findMany(
//         {
//           where: {
//             recipeId: input.id,
//           },
//           include: {
//             ingredient: true,
//           },
//         }
//       );
//
//       const { ingredientsToAdd, ingredientIDsToKeep, ingredientsToUpdate } =
//         computeIngredientsToAddAndKeep(
//           existingIngredients,
//           ingredientsAlreadyOnRecipe,
//           input.ingredients,
//           userId
//         );
//
//       const recipe = await db.recipe.update({
//         where: {
//           id: input.id,
//         },
//         data: {
//           title: input.title,
//           description: input.description,
//           timeInKitchen: input.timeInKitchen,
//           waitingTime: input.waitingTime,
//           numberOfPeople: input.numberOfPeople,
//           isPublic: input.isPublic,
//           ingredients: {
//             deleteMany: {
//               ingredientId: {
//                 notIn: ingredientIDsToKeep,
//               },
//             },
//             create: ingredientsToAdd,
//             updateMany: ingredientsToUpdate,
//           },
//           steps: {
//             deleteMany: {},
//             create: input.steps.map((step) => ({
//               content: step.content,
//             })),
//           },
//         },
//       });
//
//       return recipe;
//     }),
//
//   deleteRecipe: privateProcedure
//     .input(z.object({ id: z.string() }))
//     .mutation(async ({ ctx, input }) => {
//       const { userId } = ctx;
//
//       const recipeToDelete = await db.recipe.findFirst({
//         where: {
//           id: input.id,
//         },
//       });
//
//       if (!recipeToDelete)
//         throw new ActionError({ code: 'NOT_FOUND', message: 'Recipe not found' });
//
//       if (recipeToDelete?.userId !== userId)
//         throw new ActionError({
//           code: 'UNAUTHORIZED',
//           message: 'You are not authorized to delete this recipe',
//         });
//
//       await db.step.deleteMany({
//         where: {
//           recipeId: input.id,
//         },
//       });
//
//       await db.recipeRating.deleteMany({
//         where: {
//           recipeId: input.id,
//         },
//       });
//
//       await db.ingredientsOnRecipes.deleteMany({
//         where: {
//           recipeId: input.id,
//         },
//       });
//
//       const recipeDeleted = await db.recipe.delete({
//         where: {
//           id: input.id,
//         },
//       });
//
//       return recipeDeleted;
//     }),
//   generateRecipes: privateProcedure
//     .input(generateRecipeInput)
//     .mutation(async ({ ctx, input }) => {
//       const { count } = input;
//       const { userId } = ctx;
//
//       // loop over recipes and create them one by one recipe[0], recipe[1], recipe[2]...
//       for (let i = 0; i < count; i++) {
//         await db.recipe.create({
//           data: {
//             title: faker.commerce.productName(),
//             description: faker.lorem.paragraph(),
//             isPublic: faker.datatype.boolean(),
//             userId,
//             timeInKitchen: faker.number.int({ min: 1, max: 60 }),
//             waitingTime: faker.number.int({ min: 1, max: 60 }),
//             numberOfPeople: faker.number.int({ min: 1, max: 10 }),
//             ingredients: {
//               create: Array.from({ length: 7 }, () => ({
//                 ingredient: {
//                   create: {
//                     name: faker.commerce.productName(),
//                     unit: faker.science.unit().symbol,
//                     userId,
//                   },
//                 },
//                 quantity: faker.number.int({ min: 1, max: 10 }),
//               })),
//             },
//             steps: {
//               create: Array.from({ length: 7 }, () => ({
//                 content: faker.lorem.paragraph(),
//               })),
//             },
//             ratings: {
//               create: Array.from(
//                 { length: faker.number.int({ min: 1, max: 30 }) },
//                 () => ({
//                   rating: faker.number.int({ min: 1, max: 5 }),
//                   userId: faker.string.uuid(),
//                 })
//               ),
//             },
//           },
//         });
//       }
//     }),
// });
