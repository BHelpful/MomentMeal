/* eslint-disable @typescript-eslint/require-await */
'use server';

import { env } from '@/env.mjs';
import { revalidatePath } from 'next/cache';

export async function createRecipeRevalidate() {
  revalidatePath('/recipes');
  revalidatePath('/dashboard/recipes');
}

export async function updateRecipeRevalidate(id: string) {
  revalidatePath('/recipes');
  revalidatePath(`/recipe/${id}`);
  revalidatePath(`/dashboard/recipes`);
  revalidatePath(`/dashboard/recipe/${id}`);
  revalidatePath(`/dashboard/recipe/${id}/edit`);
}

export async function deleteRecipeRevalidate(id: string) {
  revalidatePath('/recipes');
  revalidatePath(`/recipe/${id}`);
  revalidatePath(`/dashboard/recipes`);
  revalidatePath(`/dashboard/recipe/${id}`);
}

// For development
export async function generateRecipesRevalidate() {
  if (env.NODE_ENV !== 'development') return;
  revalidatePath('/recipes');
  revalidatePath('/dashboard/recipes');
}
