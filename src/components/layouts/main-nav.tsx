'use client';

import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import type { MainNavItem, NavItemWithOptionalChildren } from '@/types';
import Link from 'next/link';
import * as React from 'react';

interface MainNavProps {
  items?: MainNavItem[];
}

function isTouchDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return true;
  }

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo className="size-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <MainResponsiveNavbarItem title={items[0].title} />
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <Icons.logo className="size-6" aria-hidden="true" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {siteConfig.description}
                        </p>
                        <span className="sr-only">Home</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {items[0].items.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null}
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <ResponsiveNavbarItem item={item} />
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), 'h-auto')}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

interface ResponsiveNavbarItemProps {
  item: NavItemWithOptionalChildren;
}

const MainResponsiveNavbarItem = ({ title }: { title: string }) => {
  if (isTouchDevice()) {
    return (
      <NavigationMenuTrigger className="h-auto">{title}</NavigationMenuTrigger>
    );
  }
  return (
    <Link href="/" legacyBehavior passHref>
      <NavigationMenuTrigger className="h-auto">{title}</NavigationMenuTrigger>
    </Link>
  );
};

function ResponsiveNavbarItem({ item }: ResponsiveNavbarItemProps) {
  if (isTouchDevice()) {
    return (
      <NavigationMenuTrigger className="h-auto capitalize">
        {item.title}
      </NavigationMenuTrigger>
    );
  }

  // 'item.items' is possibly 'undefined'
  if (!item.items) {
    return (
      <Link href={item.href ?? ''} legacyBehavior passHref>
        <NavigationMenuTrigger className="h-auto capitalize">
          {item.title}
        </NavigationMenuTrigger>
      </Link>
    );
  }

  return (
    <Link href={item.items[0]?.href ?? ''} legacyBehavior passHref>
      <NavigationMenuTrigger className="h-auto capitalize">
        {item.title}
      </NavigationMenuTrigger>
    </Link>
  );
}
