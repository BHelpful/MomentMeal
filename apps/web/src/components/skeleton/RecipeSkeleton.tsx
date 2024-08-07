import { Shell } from '@/components/shells/shell';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export function RecipeSkeleton() {
  return (
    <Shell>
      <nav
        aria-label="breadcrumbs"
        className="flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground"
      >
        <Skeleton className="h-4 w-32" /> {/* Adjusted width here */}
        <ChevronRightIcon className="mx-2 size-4" aria-hidden="true" />
        <Skeleton className="h-4 w-32" /> {/* Adjusted width here */}
      </nav>

      <div className="">
        <article className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col gap-4 md:w-1/2">
            <section className="space-y-2">
              <Skeleton className="h-6 w-32" /> {/* Adjusted width here */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-14" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-14" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-14" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-14" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-14" />
                </div>
              </div>
              <Skeleton className="h-6 w-32" /> {/* Adjusted width here */}
            </section>
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-6 w-14" />
          </div>
          <div className="w-full md:w-1/2">
            <section className="mb-4 flex h-96 w-full flex-1 items-center justify-center rounded-md bg-accent/30">
              <Skeleton className="h-9 w-14" />
            </section>
          </div>
        </article>
        <Separator className="mt-4 md:hidden" />
        <article className="flex w-full flex-col gap-8 md:flex-row md:gap-16">
          <section className="space-y-4 md:w-1/2">
            <div className="mt-4 flex flex-col justify-between sm:flex-row md:mt-0 md:flex-col lg:flex-row">
              <Skeleton className="h-6 w-32" /> {/* Adjusted width here */}
              <div className="mb-4 flex items-center space-x-2 sm:flex-row-reverse md:flex-row lg:flex-row-reverse">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-14" />
                </div>
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
            <ol className="!-mt-0 list-inside list-decimal">
              <li className="block">
                <div className="mb-2 flex cursor-pointer items-center space-x-2 rounded-lg bg-muted p-2 transition-colors duration-200 hover:bg-primary/10">
                  <Skeleton className="h-6 w-14" />
                  <div className="flex w-full justify-between">
                    <Skeleton className="h-6 w-32" />{' '}
                    {/* Adjusted width here */}
                    <Skeleton className="h-6 w-14" />
                  </div>
                </div>
              </li>
            </ol>
          </section>
          <section className="space-y-4 md:w-1/2">
            <Skeleton className="h-6 w-32" /> {/* Adjusted width here */}
            <ol className="list-inside list-decimal">
              <li className="block">
                <div className="mb-2 flex cursor-pointer items-center space-x-2 rounded-lg bg-muted p-2 transition-colors duration-200 hover:bg-primary/10">
                  <Skeleton className="h-6 w-14" />
                  <Skeleton className="h-6 w-32" /> {/* Adjusted width here */}
                </div>
              </li>
            </ol>
          </section>
        </article>
      </div>
    </Shell>
  );
}
