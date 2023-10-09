'use client';

import { trpc } from '@/app/_trpc/client';
import { type serverClient } from '@/app/_trpc/serverClient';
import { Shell } from '@/components/shells/shell';
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

  const deleteRecipe = trpc.recipe.deleteRecipe.useMutation({
    onSuccess: async () => {
      await recipe.refetch();
      return router.push('/recipes');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Shell>
      {/* delete button */}
      <div className="flex justify-end">
        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() => {
            deleteRecipe.mutate({ id });
          }}
        >
          Delete
        </button>
      </div>
      <div className="text-lg font-bold">{recipe.data.title}</div>
      <div className="text-gray-500">{recipe.data.description}</div>
      <div className="mt-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-gray-500">{recipe.data.timeInKitchen} min</span>
        </div>
        <div className="mt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-gray-500">{recipe.data.waitingTime} min</span>
        </div>
        <div className="mt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-gray-500">
            {recipe.data.numberOfPeople} servings
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-lg font-bold">Ingredients</div>
        <ul className="list-inside list-disc">
          {recipe.data.ingredients.map((ingredient) => (
            <li key={ingredient.ingredient.id}>
              {ingredient.ingredient.name} - {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <div className="text-lg font-bold">Steps</div>
        <ol className="list-inside list-decimal">
          {recipe.data.steps.map((step) => (
            <li key={step.id}>{step.content}</li>
          ))}
        </ol>
      </div>
      <div className="mt-4">
        <div className="text-lg font-bold">Ratings</div>
        <ul className="list-inside list-disc">
          {recipe.data.ratings.map((rating) => (
            <li key={rating.id}>{rating.rating}</li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
