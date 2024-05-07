import { MainNav } from '@/components/layouts/main-nav';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { dashboardConfig } from '@/config/dashboard';
import { siteConfig } from '@/config/site';
import { Suspense } from 'react';
import { UserButton, UserButtonSkeleton } from './UserButton';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <Suspense fallback={<UserButtonSkeleton />}>
          <UserButton />
        </Suspense>
      </div>
    </header>
  );
}
