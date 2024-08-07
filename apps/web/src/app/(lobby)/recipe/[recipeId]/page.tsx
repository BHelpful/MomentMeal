import { getPublicRecipe } from '@/backend/recipe/recipeActions';
import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import RecipeView from '@/components/recipeView';
import { Shell } from '@/components/shells/shell';
import { getCachedUser } from '@/lib/queries/user';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import RecipeLoading from './loading';

interface ProductPageProps {
  readonly params: {
    recipeId: string;
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

  if (!recipe?.data) {
    notFound();
  }

  return (
    <Suspense fallback={<RecipeLoading />}>
      <Shell>
        <Breadcrumbs
          segments={[
            {
              title: 'Recipes',
              href: '/recipes',
            },
            {
              title: recipe.data.title,
              href: `/recipe/${recipe.data.id}`,
            },
          ]}
        />
        <RecipeView
          initialRecipe={recipe}
          userId={user?.id}
          onDeleteHref="/recipes"
        />
      </Shell>
    </Suspense>
  );
}
