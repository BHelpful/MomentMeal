'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFieldArray,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { catchError } from '@/lib/utils';
import { createRecipeInput } from '@/trpc/recipe/recipeRouter';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export type RecipeFormInput = z.infer<typeof createRecipeInput>;

interface RecipeFormProps {
  initialData: RecipeFormInput;
  onSubmit: (data: RecipeFormInput) => Promise<void>;
}

export function RecipeForm({
  initialData,
  onSubmit,
}: Readonly<RecipeFormProps>) {
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<RecipeFormInput>({
    resolver: zodResolver(createRecipeInput),
    defaultValues: initialData,
    mode: 'onTouched',
  });

  function handleSubmit(data: RecipeFormInput) {
    startTransition(async () => {
      try {
        await onSubmit(data);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
        onSubmit={(...args) => void form.handleSubmit(handleSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Public</FormLabel>
                <FormDescription>
                  If checked, this recipe will be visible to everyone.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Type recipe title here."
                  {...field}
                />
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
        <Separator />
        <h2 className="mb-4 text-xl font-bold">Time</h2>
        <div className="flex flex-wrap gap-4">
          <FormItem>
            <FormLabel>Time In Kitchen</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type time in kitchen here."
                {...form.register('timeInKitchen', {
                  valueAsNumber: true,
                })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                  }
                }}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.timeInKitchen?.message}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Waiting Time</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type waiting time here."
                {...form.register('waitingTime', {
                  valueAsNumber: true,
                })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                  }
                }}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.waitingTime?.message}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Number Of People</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Type number of people here."
                {...form.register('numberOfPeople', {
                  valueAsNumber: true,
                })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                  }
                }}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.numberOfPeople?.message}
            />
          </FormItem>
        </div>
        <Separator />
        <h2 className="mb-4 text-xl font-bold">Ingredients</h2>
        <FormFieldArray
          control={form.control}
          name="ingredients"
          render={({ fields, remove, append }) => (
            <>
              {fields.map((ingredient, index) => (
                <div
                  key={ingredient.id}
                  className="flex w-full justify-center gap-4"
                >
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.ingredient.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredient</FormLabel>
                        <FormControl>
                          <Input
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                              }
                            }}
                            placeholder="Type ingredient name here."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="Type amount here."
                        {...form.register(`ingredients.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        form.formState.errors.ingredients?.[index]?.quantity
                          ?.message
                      }
                    />
                  </FormItem>
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.ingredient.unit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                              }
                            }}
                            placeholder="Type unit here."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-8 bg-red-500/90 hover:bg-red-500"
                    onClick={(event) => {
                      event.preventDefault();
                      remove(index);
                      form.setFocus(`ingredients.${index - 1}.ingredient.name`);
                    }}
                    disabled={fields.length === 1}
                  >
                    <Icons.Trash className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}
              <Button
                className="mx-auto w-fit bg-cyan-600/90 hover:bg-cyan-600"
                onClick={(event) => {
                  event.preventDefault();
                  append({ ingredient: { name: '', unit: 'g' }, quantity: 1 });
                }}
              >
                <Icons.Add className="size-4" aria-hidden="true" />
              </Button>
            </>
          )}
        />
        <Separator />
        <h2 className="mb-4 text-xl font-bold">Steps</h2>
        <FormFieldArray
          control={form.control}
          name="steps"
          render={({ fields, remove, append }) => (
            <>
              {fields.map((step, index) => (
                <div key={step.id} className="flex w-full justify-center gap-4">
                  <FormField
                    control={form.control}
                    name={`steps.${index}.content`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Step</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Type step here." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-8 bg-red-500/90 hover:bg-red-500"
                    onClick={(event) => {
                      event.preventDefault();
                      remove(index);
                      form.setFocus(`steps.${index - 1}.content`);
                    }}
                    disabled={fields.length === 1}
                  >
                    <Icons.Trash className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}
              <Button
                className="mx-auto w-fit bg-cyan-600/90 hover:bg-cyan-600"
                onClick={(event) => {
                  event.preventDefault();
                  append([{ content: '' }]);
                }}
              >
                <Icons.Add className="size-4" aria-hidden="true" />
              </Button>
            </>
          )}
        />
        <Separator />
        <Button
          onClick={() => {
            void form.trigger([
              'title',
              'description',
              'ingredients',
              'steps',
              'timeInKitchen',
              'waitingTime',
              'numberOfPeople',
              'isPublic',
            ]);
          }}
          className="w-fit"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending && (
            <Icons.Spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Submit
          <span className="sr-only">Submit</span>
        </Button>
      </form>
    </Form>
  );
}
