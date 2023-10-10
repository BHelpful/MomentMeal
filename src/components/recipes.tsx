'use client';

import { trpc } from '@/app/_trpc/client';
import { type serverClient } from '@/app/_trpc/serverClient';
import { Shell } from '@/components/shells/shell';
import Link from 'next/link';

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
    <Shell>
      {recipes.data.map((recipe) => (
        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
          <div className="flex flex-col gap-2" key={recipe.id}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{recipe.title}</h2>
              <p className="text-secondary">{recipe.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </Shell>
  );
}
