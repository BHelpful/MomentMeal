import { EditRecipeForm } from '@/components/forms/recipe/UpdateRecipeForm';
import { Breadcrumbs } from '@/components/pagers/breadcrumbs';
import { Shell } from '@/components/shells/shell';
import { getCachedUser } from '@/lib/queries/user';
import { getRecipe } from '@/backend/recipe/recipeActions';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    recipeId: string;
  };
}

export default async function RecipeEditPage({
  params,
}: Readonly<ProductPageProps>) {
  if (!params.recipeId) {
    notFound();
  }

  const user = await getCachedUser();

  const recipe = await getRecipe({ id: params.recipeId }).catch(() => null);

  if (!recipe || !recipe?.data || !user || recipe.data.userId !== user.id) {
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
            title: recipe?.data?.title ?? '',
            href: `/dashboard/recipe/${recipe?.data?.id}`,
          },
        ]}
      />
      <EditRecipeForm initialRecipe={recipe.data} recipeId={recipe.data.id} />
    </Shell>
  );
}
