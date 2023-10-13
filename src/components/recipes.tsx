'use client';

import { trpc } from '@/app/_trpc/client';
import { type serverClient } from '@/app/_trpc/serverClient';
import { RecipeCard } from './cards/recipe-card';

export default function RecipeList({
  initialRecipes,
}: {
  initialRecipes: Awaited<
    ReturnType<(typeof serverClient)['recipe']['getPublicRecipes']>
  >;
}) {
  const recipes = trpc.recipe.getPublicRecipes.useQuery(undefined, {
    initialData: initialRecipes,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <section className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.data.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
            href={`/recipe/${recipe.id}`}
          />
        ))}
      </div>
    </section>
  );
}
