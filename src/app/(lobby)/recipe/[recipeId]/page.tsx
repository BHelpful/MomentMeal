import { serverClient } from '@/app/_trpc/serverClient';
import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import RecipeView from '@/components/recipeView';
import { Shell } from '@/components/shells/shell';
import { getCachedUser } from '@/lib/queries/user';
import { toTitleCase } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  readonly params: {
    recipeId: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  if (!params.recipeId) {
    return {};
  }

  const recipe = await serverClient.recipe
    .getPublicRecipe({ id: params.recipeId })
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
  if (!params.recipeId) {
    notFound();
  }

  const user = await getCachedUser();

  const recipe = await serverClient.recipe
    .getPublicRecipe({ id: params.recipeId })
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
            href: `/recipe/${recipe.id}`,
          },
        ]}
      />
      <RecipeView
        id={recipe.id}
        initialRecipe={recipe}
        userId={user?.id}
        onDeleteHref="/recipes"
      />
    </Shell>
  );
}
