import { type Ingredient, type IngredientsOnRecipes } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z, type z as zodType } from 'zod';
import { type ingredientsArrayForRecipe } from './recipeRouter';

export function computeIngredientsToAddAndKeep(
  existingIngredients: Ingredient[],
  ingredientsAlreadyOnRecipe: { ingredient: Ingredient }[] &
    IngredientsOnRecipes[],
  ingredientsInput: zodType.infer<typeof ingredientsArrayForRecipe>,
  userId: string
) {
  const existingIngredientNames = existingIngredients.map(
    (ingredient) => ingredient.name
  );

  const ingredientsAlreadyOnRecipeNames = ingredientsAlreadyOnRecipe.map(
    (ingredient) => ingredient.ingredient.name
  );

  const ingredientsToCreate = ingredientsInput.filter(
    (ingredient) =>
      !existingIngredientNames.includes(ingredient.ingredient.name)
  );

  // ingredientsToConnect should also have the quantity from the ingredientsInput array
  const ingredientsToConnect = ingredientsInput
    .filter((ingredient) =>
      existingIngredientNames.includes(ingredient.ingredient.name)
    )
    .filter(
      (ingredient) =>
        !ingredientsAlreadyOnRecipeNames.includes(ingredient.ingredient.name)
    )
    .map((ingredient) => {
      const ingredientToConnect = existingIngredients.find(
        (dbIngredient) => dbIngredient.name === ingredient.ingredient.name
      );

      if (!ingredientToConnect) throw new TRPCError({ code: 'NOT_FOUND' });

      return {
        id: ingredientToConnect.id,
        quantity: z.coerce.number().parse(ingredient.quantity),
      };
    });

  const createIngredients = ingredientsToCreate.map((ingredient) => ({
    quantity: z.coerce.number().parse(ingredient.quantity),
    ingredient: {
      create: {
        name: ingredient.ingredient.name,
        unit: ingredient.ingredient.unit,
        userId,
      },
    },
  }));

  const connectIngredients = ingredientsToConnect.map((ingredient) => ({
    quantity: z.coerce.number().parse(ingredient.quantity),
    ingredient: {
      connect: {
        id: ingredient.id,
      },
    },
  }));

  const ingredientsToAdd = [...createIngredients, ...connectIngredients];

  // ingredients from ingredientsInput that are already in the database
  const ingredientsToKeep = existingIngredients
    .filter((ingredient) =>
      ingredientsInput.some(
        (inputIngredient) => inputIngredient.ingredient.name === ingredient.name
      )
    )
    .map((ingredient) => ingredient.id);

  return { ingredientsToAdd, ingredientsToKeep };
}
