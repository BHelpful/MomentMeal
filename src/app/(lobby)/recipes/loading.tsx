import { Shell } from '@/components/shells/shell';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <Shell className="gap-8">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-2 md:pt-10 lg:py-28 lg:pb-2"
      >
        <div className="hover:bg-primary/50 mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-secondary-200 bg-primary-50 px-7 py-2 shadow-md backdrop-blur transition-all hover:border-secondary-300">
          <p className="text-sm font-semibold text-secondary-700">
            <Skeleton className="h-4 w-56" />
          </p>
        </div>
        <h1 id="hero-heading" className="text-primary text-3xl font-extrabold">
          <Skeleton className="h-12 w-56" />
        </h1>
        <Shell className="items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="flex flex-col gap-2" key={i}>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-4 w-96" />
              </div>
            </div>
          ))}
        </Shell>
      </section>
    </Shell>
  );
}
