import { Icons } from '@/components/icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Recipe } from '@prisma/client';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  href: string;
}

export function RecipeCard({ recipe, href }: RecipeCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <div className="flex h-full flex-1 items-center justify-center rounded-t-md border-b bg-accent/30">
            <Icons.placeholder
              className="h-9 w-9 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{recipe.title}</CardTitle>
          {recipe.description ? (
            <CardDescription className="line-clamp-2">
              {recipe.description}
            </CardDescription>
          ) : null}
        </CardHeader>
      </Card>
      <span className="sr-only">{recipe.title}</span>
    </Link>
  );
}
