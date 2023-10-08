import { Ingredient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRecipeInput } from './recipeRouter';

export function computeIngredientsToCreateOrConnect(
  ingredients: Ingredient[],
  input: z.infer<typeof createRecipeInput>,
  userId: string
) {
  const ingredientNames = ingredients.map((ingredient) => ingredient.name);

  const ingredientsToCreate = input.ingredients.filter(
    (ingredient) => !ingredientNames.includes(ingredient.name)
  );

  // ingredientsToConnect should also have the quantity from the input.ingredients array
  const ingredientsToConnect = input.ingredients
    .filter((ingredient) => ingredientNames.includes(ingredient.name))
    .map((ingredient) => {
      const ingredientToConnect = ingredients.find(
        (dbIngredient) => dbIngredient.name === ingredient.name
      );

      if (!ingredientToConnect) throw new TRPCError({ code: 'NOT_FOUND' });

      return {
        id: ingredientToConnect.id,
        quantity: ingredient.quantity,
      };
    });

  const createIngredients = ingredientsToCreate.map((ingredient) => ({
    assignedBy: userId,
    assignedAt: new Date(),
    quantity: ingredient.quantity,
    ingredient: {
      create: {
        name: ingredient.name,
        // if unit is not provided, don't add it to the database as it is optional
        ...(ingredient.unit ? { unit: ingredient.unit } : {}),
        userId,
      },
    },
  }));

  const connectIngredients = ingredientsToConnect.map((ingredient) => ({
    assignedBy: userId,
    assignedAt: new Date(),
    quantity: ingredient.quantity,
    ingredient: {
      connect: {
        id: ingredient.id,
      },
    },
  }));
  return { createIngredients, connectIngredients };
}
