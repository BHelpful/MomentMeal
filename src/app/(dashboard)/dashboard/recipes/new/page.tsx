import { AddRecipeForm } from '@/components/forms/recipe/AddRecipeForm';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Shell } from '@/components/shells/shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { env } from '@/env.mjs';
import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'New Recipe',
  description: 'Add a new recipe',
};

export default async function NewRecipePage() {
  const user = await currentUser();

  if (!user) {
    redirect('/signin');
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-recipe-page-header"
        aria-labelledby="new-recipe-page-header-heading"
      >
        <PageHeaderHeading size="sm">New Recipe</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Add a new recipe to your account
        </PageHeaderDescription>
      </PageHeader>
      <Card
        as="section"
        id="new-recipe-page-form-container"
        aria-labelledby="new-recipe-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add recipe</CardTitle>
          <CardDescription>Add a new recipe to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddRecipeForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
