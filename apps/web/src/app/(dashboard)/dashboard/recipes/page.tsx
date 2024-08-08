import { getRecipes } from '@/backend/recipe/recipeActions';
import { RecipeCard } from '@/components/cards/recipe-card';
import { GenerateButton } from '@/components/generate-button';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Shell } from '@/components/shells/shell';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { mealTimeSubscriptionPlans } from '@/config/subscriptions';
import { env } from '@/env.mjs';
import { getCachedUser } from '@/lib/queries/user';
import { getDashboardRedirectPath, getPlanFeatures } from '@/lib/subscription';
import { cn } from '@/lib/utils';
import { type SubscriptionPlan, type UserSubscriptionPlan } from '@/types';
import { RocketIcon } from '@radix-ui/react-icons';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Recipes',
  description: 'Manage your recipes',
};

export default async function RecipesPage() {
  const user = await getCachedUser();

  if (!user) {
    redirect('/signin');
  }

  const recipes = await getRecipes();

  const subscriptionPlanStub: UserSubscriptionPlan = {
    ...(mealTimeSubscriptionPlans[0]! satisfies SubscriptionPlan),
    stripeSubscriptionId: 'sub_12345',
    stripeCurrentPeriodEnd: '2022-01-01T00:00:00.000Z',
    stripeCustomerId: 'cus_12345',
    isSubscribed: true,
    isCanceled: false,
    isActive: true,
  };

  const { maxRecipeCount } = getPlanFeatures(subscriptionPlanStub?.id);

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-recipes-page-header"
        aria-labelledby="dashboard-recipes-page-header-heading"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Recipes
          </PageHeaderHeading>
          <Link
            aria-label="Create recipe"
            href={getDashboardRedirectPath({
              recipeCount: recipes?.data?.length ?? 0,
              subscriptionPlan: subscriptionPlanStub,
            })}
            className={cn(
              buttonVariants({
                size: 'sm',
              })
            )}
          >
            Create recipe
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your recipes
        </PageHeaderDescription>
        {env.NODE_ENV !== 'production' && <GenerateButton />}
      </PageHeader>
      <Alert
        id="dashboard-recipes-page-alert"
        aria-labelledby="dashboard-recipes-page-alert-heading"
      >
        <RocketIcon className="size-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the{' '}
          <span className="font-semibold">{subscriptionPlanStub?.name}</span>{' '}
          plan. You can create up to{' '}
          <span className="font-semibold">{maxRecipeCount}</span> recipes and{' '}
          this plan.
        </AlertDescription>
        <AlertDescription className="mt-2">
          <strong>
            MomentMeal is very much in the early stages: plans and pricing are
            subject to change.
          </strong>
        </AlertDescription>
      </Alert>
      <section
        id="dashboard-recipes-page-recipes"
        aria-labelledby="dashboard-recipes-page-recipes-heading"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recipes?.data && recipes?.data?.length !== 0 ? (
          recipes?.data.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              href={`/dashboard/recipe/${recipe.id}`}
            />
          ))
        ) : (
          <div className="flex h-32 items-center justify-center text-gray-500">
            No recipes found
          </div>
        )}
      </section>
    </Shell>
  );
}
