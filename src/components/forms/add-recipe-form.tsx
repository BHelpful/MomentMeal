'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormFieldArray,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { catchError } from '@/lib/utils';
import { createRecipeInput } from '@/trpc/recipe/recipeRouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

type Inputs = z.infer<typeof createRecipeInput>;

export function AddRecipeForm({}) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(createRecipeInput),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        // TODO use client trpc for this call, as it is on the client side
        await serverClient.recipe.createRecipe(data);

        form.reset();
        toast.success('Recipe added successfully.');
        router.push('/dashboard/recipes');
        router.refresh(); // Workaround for the inconsistency of cache revalidation
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Type recipe title here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type recipe description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldArray
          control={form.control}
          name="ingredients"
          render={({ fields, remove, append }) => (
            <>
              {fields.map((ingredient, index) => (
                <div key={ingredient.id}>
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredient Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Type ingredient name here."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="Type amount here." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* TODO: Make this into a searchable dropdown and add units as an integrated part of the site, for the user to select from instead of the user manually adding only. */}
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.unit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="Type unit here." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-4 bg-red-500/90 hover:bg-red-500"
                    onClick={() => remove(index)}
                  >
                    Remove Ingredient
                  </Button>
                </div>
              ))}
              <Button
                className="bg-cyan-600/90 hover:bg-cyan-600"
                onClick={() => append({ name: '', quantity: 1, unit: 'g' })}
              >
                Add Ingredient
              </Button>
            </>
          )}
        />
        <FormFieldArray
          control={form.control}
          name="steps"
          render={({ fields, remove, append }) => (
            <>
              {fields.map((step, index) => (
                <div key={step.id}>
                  <FormField
                    control={form.control}
                    name={`steps.${index}.step`} // change this to "steps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Step</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Type step here." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-4 bg-red-500/90 hover:bg-red-500"
                    onClick={() => remove(index)}
                  >
                    Remove Step
                  </Button>
                </div>
              ))}
              <Button
                className="bg-cyan-600/90 hover:bg-cyan-600"
                onClick={() => append({ step: '' })}
              >
                Add Step
              </Button>
            </>
          )}
        />
        <Button
          onClick={() =>
            void form.trigger(['title', 'description', 'ingredients', 'steps'])
          }
          className="w-fit"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Recipe
          <span className="sr-only">Add Recipe</span>
        </Button>
      </form>
    </Form>
  );
}
