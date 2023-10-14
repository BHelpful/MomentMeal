import { env } from '@/env.mjs';
import { type SubscriptionPlan } from '@/types';

export const mealTimeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Starter',
    description: 'Perfect for individuals who want to explore new recipes.',
    features: ['Create up to 15 recipes'],
    stripePriceId: '',
    price: 0,
  },
  {
    id: 'standard',
    name: 'Foodie',
    description:
      'Perfect for food enthusiasts who want to discover new recipes.',
    features: ['Create up to 50 recipes'],
    stripePriceId: env.STRIPE_STD_MONTHLY_PRICE_ID,
    price: 10,
  },
  {
    id: 'pro',
    name: 'Chef',
    description:
      'Perfect for chefs who want to create and share their own recipes.',
    features: ['Create unlimited recipes'],
    stripePriceId: env.STRIPE_PRO_MONTHLY_PRICE_ID,
    price: 20,
  },
];
