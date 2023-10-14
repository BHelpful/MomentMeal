'use client';

import { trpc } from '@/app/_trpc/client';
import { type serverClient } from '@/app/_trpc/serverClient';
import { deleteRecipeRevalidate } from '@/app/actions';
import { Icons } from '@/components/icons';
import { Shell } from '@/components/shells/shell';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { type RecipeRating } from '@prisma/client';
import { Tooltip } from '@radix-ui/react-tooltip';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function RecipeView({
  id,
  initialRecipe,
  userId,
  onDeleteHref,
}: {
  id: string;
  initialRecipe: Awaited<
    ReturnType<(typeof serverClient)['recipe']['getPublicRecipe']>
  >;
  userId?: string;
  onDeleteHref?: string;
}) {
  const router = useRouter();
  const recipe = trpc.recipe.getPublicRecipe.useQuery(
    { id },
    {
      initialData: initialRecipe,
      refetchOnMount: false,
      refetchOnReconnect: false,
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
    return (
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    ).toFixed(1);
  }

  return (
    <Shell>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        {/* Recipe Image Carousel (placeholder for now untill we get image support) */}
        <div className="w-full md:w-1/2">
          <div className="flex h-96 w-full flex-1 items-center justify-center rounded-md bg-accent/30">
            <Icons.placeholder
              className="h-9 w-9 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">
              {recipe.data.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Icons.star className="h-5 w-5 text-muted-foreground" />
                <p className="text-base text-muted-foreground">
                  Rating: {calculateRating(recipe.data.ratings)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.heart className="h-5 w-5 text-muted-foreground" />
                <p className="text-base text-muted-foreground">
                  {recipe.data.ratings.length} ratings
                </p>
              </div>
            </div>
            {/* waitingTime, timeInKitchen, number of people with icons */}
            <div className="flex flex-wrap gap-2">
              <Tooltip delayDuration={300}>
                <TooltipContent className="w-80 p-2">
                  Time in kitchen is the time you will spend preparing the
                  ingredients, chopping, cooking, etc.
                </TooltipContent>
                <TooltipTrigger className=" cursor-default">
                  <div className="flex items-center space-x-2">
                    <Icons.ChefHat className="h-5 w-5 text-muted-foreground" />
                    <p className="text-base text-muted-foreground">
                      {recipe.data.timeInKitchen} min
                    </p>
                  </div>
                </TooltipTrigger>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipContent className="w-80 p-2">
                  Waiting time is the time you will spend waiting for the dish
                  to cook, bake, etc.
                </TooltipContent>
                <TooltipTrigger className="ml-1.5 cursor-default">
                  <div className="flex items-center space-x-2">
                    <Icons.Clock className="h-5 w-5 text-muted-foreground" />
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
                    <Icons.Users className="h-5 w-5 text-muted-foreground" />
                    <p className="text-base text-muted-foreground">
                      {recipe.data.numberOfPeople} servings
                    </p>
                  </div>
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {recipe.data.description ??
                  'No description is available for this recipe.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Ingredients</AccordionTrigger>
              <AccordionContent>
                {/* ingredients in an unordered list */}
                <ol className="list-inside list-decimal">
                  {recipe.data.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.ingredient.id}
                      className="flex items-center space-x-2 p-2"
                    >
                      <Checkbox className="h-5 w-5" />
                      <Label>
                        {ingredient.ingredient.name} - {ingredient.quantity} -
                        {ingredient.ingredient.unit}
                      </Label>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Steps</AccordionTrigger>
              <AccordionContent>
                {/* steps in an ordered list */}
                <ol className="list-inside list-decimal">
                  {recipe.data.steps.map((step) => (
                    <li
                      key={step.id}
                      className="flex items-center space-x-2 p-2"
                    >
                      <Checkbox className="h-5 w-5" />
                      <Label> {step.content}</Label>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {userId && recipe.data.userId === userId && (
            <Button
              className="self-start bg-red-500 hover:bg-red-600"
              onClick={() => deleteRecipe.mutate({ id })}
            >
              Delete Recipe
            </Button>
          )}
        </div>
      </div>
    </Shell>
  );
}
