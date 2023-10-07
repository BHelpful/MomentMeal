import { serverClient } from '@/app/_trpc/serverClient';
import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import RecipeView from '@/components/recipeView';
import { Shell } from '@/components/shells/shell';
import { toTitleCase } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    recipeId: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const recipeId = Number(params.recipeId);

  if (!recipeId || Number.isNaN(params.recipeId)) {
    return {};
  }

  const recipe = await serverClient.recipe
    .getPublicRecipe({ id: recipeId })
    .catch(() => null);

  if (!recipe) {
    return {};
  }

  return {
    title: toTitleCase(recipe.title),
    description: recipe.description ?? undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const recipeId = Number(params.recipeId);

  if (!recipeId || Number.isNaN(params.recipeId)) {
    notFound();
  }

  const recipe = await serverClient.recipe
    .getPublicRecipe({ id: recipeId })
    .catch(() => null);

  if (!recipe) {
    notFound();
  }

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: 'Recipes',
            href: '/recipes',
          },
          {
            title: recipe.title,
            href: `/recipes/${recipe.id}`,
          },
        ]}
      />
      <RecipeView id={recipe.id} initialRecipe={recipe} />
    </Shell>
  );
}
