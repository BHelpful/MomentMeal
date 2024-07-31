import { ACTION_ERROR_CODE_KEY, ActionError } from '@/lib/safe-action';
import { type Ingredient, type IngredientsOnRecipes } from '@prisma/client';
import { z, type z as zodType } from 'zod';
import { type ingredientsArrayForRecipe } from './test';

// TODO Add tests and refactor
export function computeIngredientsToAddAndKeep(
  existingIngredients: Ingredient[],
  ingredientsAlreadyOnRecipe: { ingredient: Ingredient }[] &
    IngredientsOnRecipes[],
  ingredientsInput: zodType.infer<typeof ingredientsArrayForRecipe>,
  userId: string
) {
  const ingredientsToCreate = ingredientsInput.filter(
    (ingredient) =>
      !existingIngredients.some(
        (dbIngredient) =>
          dbIngredient.name === ingredient.ingredient.name &&
          dbIngredient.unit === ingredient.ingredient.unit
      )
  );

  // ingredientsToConnect should also have the quantity from the ingredientsInput array
  const ingredientsToConnect = ingredientsInput
    .filter((ingredient) =>
      existingIngredients.some(
        (dbIngredient) =>
          dbIngredient.name === ingredient.ingredient.name &&
          dbIngredient.unit === ingredient.ingredient.unit
      )
    )
    .filter(
      (ingredient) =>
        !ingredientsAlreadyOnRecipe.some(
          (ingredientOnRecipe) =>
            ingredientOnRecipe.ingredient.name === ingredient.ingredient.name &&
            ingredientOnRecipe.ingredient.unit === ingredient.ingredient.unit
        )
    )
    .map((ingredient) => {
      const ingredientToConnect = existingIngredients.find(
        (dbIngredient) => dbIngredient.name === ingredient.ingredient.name
      );

      if (!ingredientToConnect)
        throw new ActionError({ code: ACTION_ERROR_CODE_KEY.NOT_FOUND });

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
  const ingredientIDsToKeep = existingIngredients
    .filter((ingredient) =>
      ingredientsInput.some(
        (inputIngredient) => inputIngredient.ingredient.name === ingredient.name
      )
    )
    .map((ingredient) => ingredient.id);

  const ingredientsToUpdate = ingredientsInput
    .filter((ingredient) =>
      ingredientsAlreadyOnRecipe.some(
        (ingredientOnRecipe) =>
          ingredientOnRecipe.ingredient.name === ingredient.ingredient.name &&
          ingredientOnRecipe.ingredient.unit === ingredient.ingredient.unit
      )
    )
    .map((ingredient) => {
      const ingredientToUpdate = ingredientsAlreadyOnRecipe.find(
        (ingredientOnRecipe) =>
          ingredientOnRecipe.ingredient.name === ingredient.ingredient.name &&
          ingredientOnRecipe.ingredient.unit === ingredient.ingredient.unit
      );

      if (!ingredientToUpdate)
        throw new ActionError({ code: ACTION_ERROR_CODE_KEY.NOT_FOUND });

      return {
        where: {
          ingredientId: ingredientToUpdate.ingredient.id,
        },
        data: {
          quantity: z.coerce.number().parse(ingredient.quantity),
        },
      };
    });

  return { ingredientsToAdd, ingredientIDsToKeep, ingredientsToUpdate };
}
