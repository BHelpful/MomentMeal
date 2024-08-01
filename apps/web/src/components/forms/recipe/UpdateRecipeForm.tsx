'use client';

import { updateRecipeRevalidate } from '@/app/actions';
import { catchError } from '@/lib/utils';
import { updateRecipe } from '@/backend/recipe/recipeRouter';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RecipeForm, type RecipeFormInput } from './RecipeForm';

interface EditRecipeFormProps {
  recipeId: string;
  initialRecipe: RecipeFormInput;
}

export function EditRecipeForm({
  recipeId,
  initialRecipe,
}: Readonly<EditRecipeFormProps>) {
  const router = useRouter();

  async function handleSubmit(data: RecipeFormInput) {
    try {
      await updateRecipe({ id: recipeId, ...data });

      toast.success('Recipe updated successfully.');
      await updateRecipeRevalidate(recipeId);
      router.push(`/dashboard/recipe/${recipeId}`);
      router.refresh(); // Workaround for the inconsistency of cache revalidation
    } catch (err) {
      catchError(err);
    }
  }

  return <RecipeForm initialData={initialRecipe} onSubmit={handleSubmit} />;
}
