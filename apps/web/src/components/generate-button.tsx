'use client';

import { generateRecipesRevalidate } from '@/app/actions';
import { generateRecipes } from '@/backend/recipe/recipeActions';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { catchError } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';

export function GenerateButton() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <Button
      className="h-8 px-2 lg:px-3"
      onClick={() => {
        startTransition(async () => {
          try {
            await generateRecipes({ count: 5 });
            toast.success('Recipes generated successfully.');
            await generateRecipesRevalidate();
            router.push('/dashboard/recipes');
            router.refresh(); // Workaround for the inconsistency of cache revalidation
          } catch (err) {
            catchError(err);
          }
        });
      }}
    >
      {isPending && (
        <Icons.Spinner
          className="mr-2 size-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Generate
    </Button>
  );
}
