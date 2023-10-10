import { serverClient } from '@/app/_trpc/serverClient';
import RecipeList from '@/components/recipes';
import { Shell } from '@/components/shells/shell';

const Page = async () => {
  const recipes = await serverClient.recipe.getPublicRecipes();

  return (
    <Shell className="gap-8">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-2 md:pt-10 lg:py-28 lg:pb-2"
      >
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border px-7 py-2 shadow-md backdrop-blur transition-all hover:bg-primary/50">
          <p className="text-sm font-semibold">Look at all those recipes</p>
        </div>
        <h1 id="hero-heading" className="text-3xl font-extrabold text-primary">
          Recipes
        </h1>
        <RecipeList initialRecipes={recipes} />
      </section>
    </Shell>
  );
};

export default Page;
