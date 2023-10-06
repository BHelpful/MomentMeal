'use client';

import { trpc } from '@/app/_trpc/client';
import { serverClient } from '@/app/_trpc/serverClient';

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
    <div className="flex flex-col gap-4">
      {recipes.data.map((recipe) => (
        <div className="flex flex-col gap-2" key={recipe.id}>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p className="text-secondary">{recipe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
