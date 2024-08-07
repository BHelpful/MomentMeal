import { getRecipe } from '@/backend/recipe/recipeActions';
import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import RecipeView from '@/components/recipeView';
import { Shell } from '@/components/shells/shell';
import { getCachedUser } from '@/lib/queries/user';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import RecipeLoading from './loading';

interface ProductPageProps {
  params: {
    recipeId: string;
  };
}

export default async function RecipeViewPage({
  params,
}: Readonly<ProductPageProps>) {
  if (!params.recipeId) {
    notFound();
  }

  const user = await getCachedUser();

  const recipe = await getRecipe({ id: params.recipeId }).catch(() => null);

  if (!recipe?.data) {
    notFound();
  }

  return (
    <Suspense fallback={<RecipeLoading />}>
      <Shell>
        <Breadcrumbs
          segments={[
            {
              title: 'My Recipes',
              href: '/dashboard/recipes',
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
          onDeleteHref="/dashboard/recipes"
        />
      </Shell>
    </Suspense>
  );
}
