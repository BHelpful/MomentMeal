'use client';

import { trpc } from '@/app/_trpc/client';
import { type serverClient } from '@/app/_trpc/serverClient';
import { deleteRecipeRevalidate } from '@/app/actions';
import { Icons } from '@/components/icons';
import { Shell } from '@/components/shells/shell';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type RecipeRating } from '@prisma/client';
import { Tooltip } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button, buttonVariants } from './ui/button';
import { TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function RecipeView({
  id,
  initialRecipe,
  userId,
  onDeleteHref,
}: {
  readonly id: string;
  readonly initialRecipe: Awaited<
    ReturnType<(typeof serverClient)['recipe']['getPublicRecipe']>
  >;
  readonly userId?: string;
  readonly onDeleteHref?: string;
}) {
  const router = useRouter();

  // TODO figure out a way to use fitting router based on the environment i.e. public or private
  // In this case it is always fetching public recipe also for private recipes, which will result in 404
  // An idea is to create a wrapper component. One for public and one for private recipes. Then have the ui component be shared between them
  const recipe = trpc.recipe.getPublicRecipe.useQuery(
    { id },
    {
      initialData: initialRecipe,
      refetchOnMount: true,
      refetchOnReconnect: true,
      cacheTime: 0,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteRecipe = trpc.recipe.deleteRecipe.useMutation({
    onSettled: async () => {
      toast.success('Recipe deleted');

      await deleteRecipeRevalidate(id);
      router.push(onDeleteHref ?? '/');
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function calculateRating(ratings: RecipeRating[]) {
    if (ratings.length === 0) return 0;
    return (
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    ).toFixed(1);
  }

  return (
    <Shell>
      <div className="">
        {/* Recipe Image Carousel (placeholder for now untill we get image support) */}
        <article className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col gap-4 md:w-1/2">
            <section className="space-y-2">
              <h2 className="line-clamp-1 text-2xl font-bold">
                {recipe.data.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Icons.star className="size-5 text-muted-foreground" />
                  <p className="text-base text-muted-foreground">
                    Rating: {calculateRating(recipe.data.ratings)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icons.heart className="size-5 text-muted-foreground" />
                  <p className="text-base text-muted-foreground">
                    {recipe.data.ratings.length} ratings
                  </p>
                </div>
              </div>
              {/* waitingTime, timeInKitchen, number of people with icons */}
              <div className="flex flex-wrap gap-2">
                <Tooltip delayDuration={300}>
                  <TooltipContent className="w-80 p-2">
                    The time you will spend preparing the
                    ingredients, chopping, cooking, etc.
                  </TooltipContent>
                  <TooltipTrigger className="cursor-default">
                    <div className="flex items-center space-x-2">
                      <Icons.ChefHat className="size-5 text-muted-foreground" />
                      <p className="text-base text-muted-foreground">
                        {recipe.data.timeInKitchen} min
                      </p>
                    </div>
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip delayDuration={300}>
                  <TooltipContent className="w-80 p-2">
                    The time you will spend waiting for the dish
                    to cook, bake, etc.
                  </TooltipContent>
                  <TooltipTrigger className="ml-1.5 cursor-default">
                    <div className="flex items-center space-x-2">
                      <Icons.Clock className="size-5 text-muted-foreground" />
                      <p className="text-base text-muted-foreground">
                        {recipe.data.waitingTime} min
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
                        {recipe.data.numberOfPeople} servings
                      </p>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </div>
              <p className="text-base">
                {recipe.data.description ??
                  'No description is available for this recipe.'}
              </p>
            </section>

            {userId && recipe.data.userId === userId && (
              <>
                <Button
                  className="self-start bg-red-500 hover:bg-red-600"
                  onClick={() => deleteRecipe.mutate({ id })}
                >
                  Delete Recipe
                </Button>
                <Link
                  className={cn(
                    buttonVariants({
                      size: 'sm',
                    })
                  )}
                  href={`/dashboard/recipe/${recipe.data.id}/edit`}
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
            <h2 className="mb-4 text-2xl font-semibold" id="ingredients-title">
              Ingredients
            </h2>
            <div className="mb-4 flex items-center space-x-2">
              <Button variant="outline">-</Button>
              <span>{recipe.data.numberOfPeople} servings</span>
              <Button variant="outline">+</Button>
            </div>
            <ol className="list-inside list-decimal">
              {recipe.data.ingredients.map((ingredient) => (
                <li key={ingredient.ingredient.id} className="block">
                  <label
                    htmlFor={`checkbox-${ingredient.ingredient.id}`}
                    className="mb-2 flex cursor-pointer items-center space-x-2 rounded-lg bg-muted p-2 transition-colors duration-200 hover:bg-primary/10"
                  >
                    <Checkbox
                      id={`checkbox-${ingredient.ingredient.id}`}
                      className="size-5"
                    />
                    <span className="flex items-center space-x-2">
                      <span className="font-bold">
                        {ingredient.quantity} {ingredient.ingredient.unit}
                      </span>
                      <p>{ingredient.ingredient.name}</p>
                    </span>
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
              {recipe.data.steps.map((step) => (
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
