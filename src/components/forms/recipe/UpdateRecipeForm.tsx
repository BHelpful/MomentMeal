import type { serverClient as SCType } from '@/app/_trpc/serverClient';
import { serverClient } from '@/app/_trpc/serverClient';
import { updateRecipeRevalidate } from '@/app/actions';
import { catchError } from '@/lib/utils';
import type { createRecipeInput } from '@/trpc/recipe/recipeRouter';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { z } from 'zod';
import { RecipeForm, type RecipeFormInput } from './RecipeForm';

interface EditRecipeFormProps {
  recipeId: string;
  initialRecipe: Awaited<
    ReturnType<(typeof SCType)['recipe']['getRecipe']>
  >;
}

export function EditRecipeForm({
  recipeId,
  initialRecipe,
}: Readonly<EditRecipeFormProps>) {
  const router = useRouter();

  async function handleSubmit(data: RecipeFormInput) {
    try {
      await serverClient.recipe.updateRecipe({ id: recipeId, ...data });

      toast.success('Recipe updated successfully.');
      await updateRecipeRevalidate(recipeId);
      router.push(`/dashboard/recipe/${recipeId}`);
      router.refresh(); // Workaround for the inconsistency of cache revalidation
    } catch (err) {
      catchError(err);
    }
  }

  return (
    <RecipeForm
      initialData={initialRecipe satisfies z.infer<typeof createRecipeInput>}
      onSubmit={handleSubmit}
    />
  );
}
