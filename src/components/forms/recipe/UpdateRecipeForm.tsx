'use client';

import { trpc } from '@/app/_trpc/client';
import type { serverClient } from '@/app/_trpc/serverClient';
import { updateRecipeRevalidate } from '@/app/actions';
import { catchError } from '@/lib/utils';
import type { createRecipeInput } from '@/trpc/recipe/recipeRouter';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { RecipeFormInput } from '../add-recipe-form';
import { RecipeForm } from './RecipeForm';

interface EditRecipeFormProps {
  recipeId: string;
  initialRecipe: Awaited<
    ReturnType<(typeof serverClient)['recipe']['getRecipe']>
  >;
}

export function EditRecipeForm({
  recipeId,
  initialRecipe,
}: EditRecipeFormProps) {
  const router = useRouter();

  const recipeQuery = trpc.recipe.getRecipe.useQuery(
    { id: recipeId },
    {
      initialData: initialRecipe,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
  const updateRecipe = trpc.recipe.updateRecipe.useMutation();

  async function handleSubmit(data: RecipeFormInput) {
    try {
      await updateRecipe.mutateAsync({ id: recipeId, ...data });

      toast.success('Recipe updated successfully.');
      await updateRecipeRevalidate(recipeId);
      router.push(`/dashboard/recipe/${recipeId}`);
      router.refresh(); // Workaround for the inconsistency of cache revalidation
    } catch (err) {
      catchError(err);
    }
  }

  if (recipeQuery.status === 'error') {
    return <div>Error: {recipeQuery.error.message}</div>;
  }

  return (
    <RecipeForm
      initialData={recipeQuery.data satisfies z.infer<typeof createRecipeInput>}
      onSubmit={handleSubmit}
    />
  );
}
