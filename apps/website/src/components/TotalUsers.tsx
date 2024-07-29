import { clerkClient } from '@clerk/nextjs/server';
import Balancer from 'react-wrap-balancer';
import { Icons } from './icons';

export default async function TotalUsers() {
  const totalUsers = await clerkClient.users.getCount();
  return (
    <>
      {totalUsers >= 20 && (
        <Balancer className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border px-7 py-2 shadow-md backdrop-blur transition-all hover:bg-primary/50">
          <div className="flex items-center space-x-2">
            <p className="text-base text-muted-foreground">
              Used by {totalUsers}
            </p>
            <Icons.Users className="size-5 text-muted-foreground" />
          </div>
        </Balancer>
      )}
    </>
  );
}
