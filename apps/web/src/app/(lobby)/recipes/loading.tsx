import { Shell } from '@/components/shells/shell';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <Shell>
      <div className="space-y-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="h-full overflow-hidden">
              <AspectRatio ratio={21 / 9}>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
                <div className="flex h-full flex-1 items-center justify-center rounded-t-md border-b bg-accent/30">
                  <Skeleton className="size-9 text-muted-foreground" />
                </div>
              </AspectRatio>
              <CardHeader>
                <Skeleton className="line-clamp-1 text-lg" />
                <Skeleton className="line-clamp-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="line-clamp-3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="line-clamp-1" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}
