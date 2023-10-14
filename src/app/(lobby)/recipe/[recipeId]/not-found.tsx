import { ErrorCard } from '@/components/cards/error-card';
import { Shell } from '@/components/shells/shell';

export default function RecipeNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Recipe not found"
        description="The recipe you are looking for does not exist."
        retryLink="/dashboard/recipes"
        retryLinkText="Go to Recipes"
      />
    </Shell>
  );
}
