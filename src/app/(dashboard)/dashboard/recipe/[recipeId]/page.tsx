import { serverClient } from '@/app/_trpc/serverClient';
import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import RecipeView from '@/components/recipeView';
import { Shell } from '@/components/shells/shell';
import { toTitleCase } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    recipeId: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  if (!params.recipeId) {
    return {};
  }

  const recipe = await serverClient.recipe
    .getRecipe({ id: params.recipeId })
    .catch(() => null);

  if (!recipe) {
    return {};
  }

  return {
    title: toTitleCase(recipe.title),
    description: recipe.description ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: Readonly<ProductPageProps>) {
  if (!params.recipeId) {
    notFound();
  }

  const user = await currentUser();

  const recipe = await serverClient.recipe
    .getRecipe({ id: params.recipeId })
    .catch(() => null);

  if (!recipe) {
    notFound();
  }

  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: 'My Recipes',
            href: '/dashboard/recipes',
          },
          {
            title: recipe.title,
            href: `/dashboard/recipe/${recipe.id}`,
          },
        ]}
      />
      <RecipeView
        id={recipe.id}
        initialRecipe={recipe}
        userId={user?.id}
        onDeleteHref="/dashboard/recipes"
      />
    </Shell>
  );
}
