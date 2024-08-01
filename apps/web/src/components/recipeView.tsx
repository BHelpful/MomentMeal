'use client';

import { deleteRecipeRevalidate } from '@/app/actions';
import type { getPublicRecipe } from '@/backend/recipe/recipeActions';
import { deleteRecipe } from '@/backend/recipe/recipeActions';
import { Icons } from '@/components/icons';
import { Shell } from '@/components/shells/shell';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type RecipeRating } from '@prisma/client';
import { Tooltip } from '@radix-ui/react-tooltip';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button, buttonVariants } from './ui/button';
import { TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function RecipeView({
  initialRecipe,
  userId,
  onDeleteHref,
}: Readonly<{
  initialRecipe: Awaited<ReturnType<typeof getPublicRecipe>>;
  userId?: string;
  onDeleteHref?: string;
}>) {
  const router = useRouter();

  const [currentServings, setCurrentServings] = useState(
    initialRecipe?.data?.numberOfPeople ?? 0
  );
  const [isAdjusted, setIsAdjusted] = useState(false);

  const adjustServings = (newServings: number) => {
    if (newServings >= 1 && newServings <= 20) {
      setCurrentServings(newServings);
      setIsAdjusted(newServings !== initialRecipe?.data?.numberOfPeople);
    }
  };

  const resetServings = () => {
    setCurrentServings(initialRecipe?.data?.numberOfPeople ?? 0);
    setIsAdjusted(false);
  };

  const scaleIngredientQuantity = (quantity: number) => {
    const scale = currentServings / (initialRecipe?.data?.numberOfPeople ?? 1);
    return quantity * scale;
  };

  // TODO: figure out a way to use fitting router based on the environment i.e. public or private
  // In this case it is always fetching public recipe also for private recipes, which will result in 404
  // An idea is to create a wrapper component. One for public and one for private recipes. Then have the ui component be shared between them

  const deleteAction = useAction(deleteRecipe, {
    onSuccess: async ({ data }) => {
      if (!data) throw new Error('No data returned');
      toast.success('Recipe deleted');
      await deleteRecipeRevalidate(data.id);
      router.push(onDeleteHref ?? '/');
      router.refresh();
    },
    onError: ({ error }) => {
      if (error.fetchError) {
        toast.error('Failed to delete recipe' + error.fetchError);
      }
      if (error.serverError) {
        toast.error('Failed to delete recipe' + error.serverError);
      }
    },
  });

  function calculateRating(ratings: RecipeRating[]) {
    if (ratings.length === 0) return 0;
    return (
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    ).toFixed(1);
  }

  if (!initialRecipe?.data) {
    return null;
  }
  const recipe = initialRecipe?.data;
  return (
    <Shell>
      <div className="">
        {/* Recipe Image Carousel (placeholder for now untill we get image support) */}
        <article className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col gap-4 md:w-1/2">
            <section className="space-y-2">
              <h2 className="line-clamp-1 text-2xl font-bold">
                {recipe.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Icons.star className="size-5 text-muted-foreground" />
                  <p className="text-base text-muted-foreground">
                    Rating: {calculateRating(recipe.ratings)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icons.heart className="size-5 text-muted-foreground" />
                  <p className="text-base text-muted-foreground">
                    {recipe.ratings.length} ratings
                  </p>
                </div>
              </div>
              {/* waitingTime, timeInKitchen, number of people with icons */}
              <div className="flex flex-wrap gap-2">
                <Tooltip delayDuration={300}>
                  <TooltipContent className="w-80 p-2">
                    The time you will spend preparing the ingredients, chopping,
                    cooking, etc.
                  </TooltipContent>
                  <TooltipTrigger className="cursor-default">
                    <div className="flex items-center space-x-2">
                      <Icons.ChefHat className="size-5 text-muted-foreground" />
                      <p className="text-base text-muted-foreground">
                        {recipe.timeInKitchen} min
                      </p>
                    </div>
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip delayDuration={300}>
                  <TooltipContent className="w-80 p-2">
                    The time you will spend waiting for the dish to cook, bake,
                    etc.
                  </TooltipContent>
                  <TooltipTrigger className="ml-1.5 cursor-default">
                    <div className="flex items-center space-x-2">
                      <Icons.Clock className="size-5 text-muted-foreground" />
                      <p className="text-base text-muted-foreground">
                        {recipe.waitingTime} min
                      </p>
                    </div>
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip delayDuration={300}>
                  <TooltipContent className="w-80 p-2">
                    The number of people this recipe is intended for.
                  </TooltipContent>
                  <TooltipTrigger className="ml-1.5 cursor-default">
                    <div className="flex items-center space-x-2">
                      <Icons.Users className="size-5 text-muted-foreground" />
                      <p className="text-base text-muted-foreground">
                        {recipe.numberOfPeople} servings
                      </p>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </div>
              <p className="text-base">
                {recipe.description ??
                  'No description is available for this recipe.'}
              </p>
            </section>

            {userId && recipe.userId === userId && (
              <>
                <Button
                  className="self-start bg-red-500 hover:bg-red-600"
                  onClick={() => deleteAction.execute({ id: recipe.id })}
                >
                  Delete Recipe
                </Button>
                <Link
                  className={cn(
                    buttonVariants({
                      size: 'sm',
                    })
                  )}
                  href={`/dashboard/recipe/${recipe.id}/edit`}
                >
                  Edit Recipe
                </Link>
              </>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <section className="mb-4 flex h-96 w-full flex-1 items-center justify-center rounded-md bg-accent/30">
              <Icons.placeholder
                className="size-9 text-muted-foreground"
                aria-hidden="true"
              />
            </section>
          </div>
        </article>
        <Separator className="mt-4 md:hidden" />
        <article className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
          <section className="space-y-4 md:w-1/2">
            <div className="mt-4 flex flex-col justify-between sm:flex-row md:mt-0 md:flex-col lg:flex-row">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="ingredients-title"
              >
                Ingredients
              </h2>
              <div className="mb-4 flex items-center space-x-2 sm:flex-row-reverse md:flex-row lg:flex-row-reverse">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => adjustServings(currentServings - 1)}
                  >
                    -
                  </Button>
                  <div style={{ width: '90px', textAlign: 'center' }}>
                    {currentServings} servings
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => adjustServings(currentServings + 1)}
                  >
                    +
                  </Button>
                </div>
                {isAdjusted && (
                  <Button
                    className="!mr-2"
                    variant="outline"
                    onClick={resetServings}
                  >
                    <Icons.reset className="size-5" />
                  </Button>
                )}
              </div>
            </div>
            <ol className="list-inside list-decimal">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.ingredient.id} className="block">
                  <label
                    htmlFor={`checkbox-${ingredient.ingredient.id}`}
                    className="mb-2 flex cursor-pointer items-center space-x-2 rounded-lg bg-muted p-2 transition-colors duration-200 hover:bg-primary/10"
                  >
                    <Checkbox
                      id={`checkbox-${ingredient.ingredient.id}`}
                      className="size-5"
                    />
                    <div className="flex w-full justify-between">
                      <p>{ingredient.ingredient.name}</p>
                      <span className="font-bold">
                        {scaleIngredientQuantity(ingredient.quantity)}{' '}
                        {ingredient.ingredient.unit}
                      </span>
                    </div>
                  </label>
                </li>
              ))}
            </ol>
          </section>
          <section className="space-y-4 md:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold" id="ingredients-title">
              Steps
            </h2>
            <ol className="list-inside list-decimal">
              {recipe.steps.map((step) => (
                <li key={step.id} className="block">
                  <label
                    htmlFor={`checkbox-step-${step.id}`}
                    className="mb-2 flex cursor-pointer items-center space-x-2 rounded-lg bg-muted p-2 transition-colors duration-200 hover:bg-primary/10"
                  >
                    <Checkbox
                      id={`checkbox-step-${step.id}`}
                      className="size-5"
                    />
                    <span>{step.content}</span>
                  </label>
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>
    </Shell>
  );
}
