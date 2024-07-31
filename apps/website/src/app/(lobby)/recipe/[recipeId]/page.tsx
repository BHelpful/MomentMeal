import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import RecipeView from '@/components/recipeView';
import { Shell } from '@/components/shells/shell';
import { getCachedUser } from '@/lib/queries/user';
import { toTitleCase } from '@/lib/utils';
import { getPublicRecipe } from '@/trpc/recipe/recipeRouter';
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

  const recipe = await getPublicRecipe({ id: params.recipeId }).catch(
    () => null
  );

  if (!recipe) {
    return {};
  }

  return {
    title: toTitleCase(recipe?.data?.title ?? ''),
    description: recipe?.data?.description ?? '',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  if (!params.recipeId) {
    notFound();
  }

  const user = await getCachedUser();

  const recipe = await getPublicRecipe({ id: params.recipeId }).catch(
    () => null
  );

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
            title: recipe?.data?.title ?? '',
            href: `/recipe/${recipe?.data?.id}`,
          },
        ]}
      />
      <RecipeView
        initialRecipe={recipe}
        userId={user?.id}
        onDeleteHref="/recipes"
      />
    </Shell>
  );
}
