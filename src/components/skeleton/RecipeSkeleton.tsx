import { Shell } from '@/components/shells/shell';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function RecipeSkeleton() {
  return (
    <Shell>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-14" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-14" />
          </div>
          <Separator className="my-1.5" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[7.5rem]" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Separator className="mb-2.5 mt-5" />
          <div className="flex items-center">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="ml-auto h-4 w-4" />
          </div>
          <Separator className="mt-2.5" />
        </div>
      </div>
      <div className="overflow-hidden md:pt-6">
        <Skeleton className="h-9 w-14" />
      </div>
    </Shell>
  );
}
