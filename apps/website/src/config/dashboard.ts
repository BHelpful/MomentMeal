import { type SidebarNavItem } from '@/types';

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Account',
      href: '/dashboard/account',
      icon: 'User',
      items: [],
    },
    {
      title: 'Recipes',
      href: '/dashboard/recipes',
      icon: 'Recipe',
      items: [],
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'Billing',
      items: [],
    },
    {
      title: 'Purchases',
      href: '/dashboard/purchases',
      icon: 'DollarSign',
      items: [],
    },
  ],
};
