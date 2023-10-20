'use client';

import { trpc } from '@/app/_trpc/client';
import { createRecipeRevalidate } from '@/app/actions';
import { catchError } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RecipeForm, type RecipeFormInput } from './RecipeForm';

export function AddRecipeForm() {
  const router = useRouter();

  const createRecipe = trpc.recipe.createRecipe.useMutation();

  async function handleSubmit(data: RecipeFormInput) {
    try {
      await createRecipe.mutateAsync(data);

      toast.success('Recipe added successfully.');
      await createRecipeRevalidate();
      router.push('/dashboard/recipes');
      router.refresh(); // Workaround for the inconsistency of cache revalidation
    } catch (err) {
      catchError(err);
    }
  }

  return (
    <RecipeForm
      initialData={{
        title: '',
        description: '',
        ingredients: [{ ingredient: { name: '', unit: 'g' }, quantity: 1 }],
        steps: [{ content: '' }],
        timeInKitchen: 15,
        waitingTime: 30,
        numberOfPeople: 2,
        isPublic: false,
      }}
      onSubmit={handleSubmit}
    />
  );
}
