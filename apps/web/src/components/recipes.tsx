'use client';

import type { getPublicRecipes } from '@/trpc/recipe/recipeRouter';
import { RecipeCard } from './cards/recipe-card';

export default function RecipeList({
  recipes,
}: {
  recipes: Awaited<ReturnType<typeof getPublicRecipes>>;
}) {
  return (
    <section className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes?.data && recipes?.data?.length !== 0 ? (
          recipes?.data.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
            />
          ))
        ) : (
          <div className="flex h-32 items-center justify-center text-gray-500">
            No recipes found
          </div>
        )}
      </div>
    </section>
  );
}
