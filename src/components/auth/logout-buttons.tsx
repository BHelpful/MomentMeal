'use client';

import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export function LogOutButtons() {
  const router = useRouter();
  const mounted = useMounted();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <SignOutButton
          signOutCallback={() =>
            startTransition(() => {
              router.push(`${window.location.origin}/?redirect=false`);
            })
          }
        >
          <Button
            aria-label="Log out"
            size="sm"
            className="w-full"
            disabled={isPending}
          >
            {isPending && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log out
          </Button>
        </SignOutButton>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: 'sm' }),
            'w-full bg-muted text-muted-foreground'
          )}
        >
          Log out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  );
}
