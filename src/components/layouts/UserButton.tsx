import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCachedUser } from '@/lib/queries/user';
import { getUserEmail } from '@/lib/utils';
import Link from 'next/link';

export async function UserButton() {
  const user = await getCachedUser();
  const initials = `${user?.firstName?.charAt(0) ?? ''} ${
    user?.lastName?.charAt(0) ?? ''
  }`;
  const email = getUserEmail(user);

  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.imageUrl} alt={user.username ?? ''} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/account">
                    <Icons.User className="mr-2 h-4 w-4" aria-hidden="true" />
                    Account
                    <DropdownMenuShortcut>A</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/recipes">
                    <Icons.Recipe className="mr-2 h-4 w-4" aria-hidden="true" />
                    Recipes
                    <DropdownMenuShortcut>R</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild disabled>
                  <Link href="/dashboard/settings">
                    <Icons.settings
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Settings
                    <DropdownMenuShortcut>S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/signout">
                    <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                    Quit (Log out)
                    <DropdownMenuShortcut>Q</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/signin"
            className={buttonVariants({
              size: 'sm',
            })}
          >
            Sign In
            <span className="sr-only">Sign In</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

export function UserButtonSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-2">
        <Button variant="secondary" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback />
          </Avatar>
        </Button>
      </nav>
    </div>
  );
}
