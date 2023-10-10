import { mealTimeSubscriptionPlans } from '@/config/subscriptions';
import type { SubscriptionPlan, UserSubscriptionPlan } from '@/types';

export function getPlanFeatures(planId?: SubscriptionPlan['id']) {
  const plan = mealTimeSubscriptionPlans.find((plan) => plan.id === planId);
  const features = plan?.features.map((feature) => feature.split(',')).flat();

  const maxRecipeCount =
    features?.find((feature) => feature.match(/recipe/i))?.match(/\d+/) ?? 0;

  return {
    maxRecipeCount,
  };
}

export function getDashboardRedirectPath(input: {
  recipeCount: number;
  subscriptionPlan: UserSubscriptionPlan | null;
}): string {
  const { recipeCount, subscriptionPlan } = input;

  const minRecipesWithProductCount = {
    basic: 5,
    standard: 15,
    pro: 50,
  }[subscriptionPlan?.id ?? 'basic'];

  const isActive = subscriptionPlan?.isActive ?? false;
  const hasEnoughRecipes = recipeCount >= minRecipesWithProductCount;

  return isActive && hasEnoughRecipes
    ? '/dashboard/billing'
    : '/dashboard/recipes/new';
}
