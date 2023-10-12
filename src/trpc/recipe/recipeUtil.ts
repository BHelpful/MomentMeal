import { type Ingredient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { type z } from 'zod';
import { type ingredientsArrayForRecipe } from './recipeRouter';

export function computeIngredientsToCreateOrConnect(
  ingredients: Ingredient[],
  ingredientsInput: z.infer<typeof ingredientsArrayForRecipe>,
  userId: string
) {
  const ingredientNames = ingredients.map((ingredient) => ingredient.name);

  const ingredientsToCreate = ingredientsInput.filter(
    (ingredient) => !ingredientNames.includes(ingredient.name)
  );

  // ingredientsToConnect should also have the quantity from the ingredientsInput array
  const ingredientsToConnect = ingredientsInput
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
    quantity: ingredient.quantity,
    ingredient: {
      connect: {
        id: ingredient.id,
      },
    },
  }));
  return { createIngredients, connectIngredients };
}
