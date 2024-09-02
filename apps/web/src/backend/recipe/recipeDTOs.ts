import { z } from 'zod';

export const ingredientsArrayForRecipe = z.array(
  z.object({
    ingredient: z.object({
      name: z.string().min(1).max(50),
      unit: z.string().min(1).max(50),
    }),
    quantity: z.number().min(1),
  })
);

export const createAndUpdateRecipeInput = z.object({
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
  images: z
    .custom<File[] | undefined | null>()
    .optional()
    .nullable()
    .default(null),
});

export const createRecipeInput = createAndUpdateRecipeInput;

export const updateRecipeInput = z.object({
  id: z.string(),
  ...createAndUpdateRecipeInput.shape,
});

export const generateRecipeInput = z.object({
  count: z.number(),
});
