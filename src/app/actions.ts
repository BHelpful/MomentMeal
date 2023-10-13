/* eslint-disable @typescript-eslint/require-await */
'use server';

import { env } from '@/env.mjs';
// TODO: figure out if revalidatePath is for all clients or only the current one
import { revalidatePath } from 'next/cache';

export async function createRecipeRevalidate() {
  revalidatePath('/recipes');
  revalidatePath('/dashboard/recipes');
}

export async function deleteRecipeRevalidate(id: string) {
  revalidatePath('/recipes');
  revalidatePath(`/recipes/${id}`);
  revalidatePath(`/dashboard/recipes`);
  revalidatePath(`/dashboard/recipes/${id}`);
}

// For development
export async function generateRecipesRevalidate() {
  if (env.NODE_ENV !== 'development') return;
  revalidatePath('/recipes');
  revalidatePath('/dashboard/recipes');
}
