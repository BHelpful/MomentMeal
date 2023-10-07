import { Shell } from '@/components/shells/shell';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  <Shell className="items-center">
    {Array.from({ length: 4 }).map((_, i) => (
      <div className="flex flex-col gap-2" key={i}>
        <div className="flex flex-col items-center gap-2">
          {/* canter skeleton in div */}
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
    ))}
  </Shell>;
}
