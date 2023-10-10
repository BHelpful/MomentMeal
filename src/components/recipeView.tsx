'use client';

import { trpc } from '@/app/_trpc/client';
import { type serverClient } from '@/app/_trpc/serverClient';
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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RecipeView({
  id,
  initialRecipe,
}: {
  id: string;
  initialRecipe: Awaited<
    ReturnType<(typeof serverClient)['recipe']['getPublicRecipe']>
  >;
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
    onSuccess: async () => {
      await recipe.refetch();
      return router.push('/recipes');
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
              <div className="flex items-center space-x-2">
                <Icons.clock className="h-5 w-5 text-muted-foreground" />
                <p className="text-base text-muted-foreground">
                  {recipe.data.waitingTime} min
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Icons.clock className="h-5 w-5 text-muted-foreground" />
                <p className="text-base text-muted-foreground">
                  {recipe.data.timeInKitchen} min
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Icons.users className="h-5 w-5 text-muted-foreground" />
                <p className="text-base text-muted-foreground">
                  {recipe.data.numberOfPeople} servings
                </p>
              </div>
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
                        {ingredient.ingredient.name} - {ingredient.quantity}
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
        </div>
      </div>
    </Shell>
  );
}
