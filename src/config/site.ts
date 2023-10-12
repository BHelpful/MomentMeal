import type { FooterItem, MainNavItem } from '@/types';

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: 'https://twitter.com/AndreasGuldberg',
  github: 'https://github.com/bhelpful/momentmeal',
  githubAccount: 'https://github.com/bhelpful',
  discord: 'https://discord.com/users/bhelpful',
};

export const siteConfig = {
  name: 'MomentMeal',
  description:
    'A marketplace for food and recipes. We help you create and share your recipes with the world. Begin your culinary journey today.',
  url: 'https://momentmeal.com',
  ogImage: 'https://momentmeal.com/opengraph-image.png',
  mainNav: [
    {
      title: 'Home',
      items: [
        {
          title: 'Recipes',
          href: '/recipes',
          description: 'Find recipes for all occasions.',
          items: [],
        },
        {
          title: 'Meal Plans',
          href: '/meal-plans',
          description: 'Find meal plans for all occasions.',
          items: [],
        },
        {
          title: 'Blog',
          href: '/blog',
          description: 'Read our latest blog posts.',
          items: [],
        },
      ],
    },
    {
      title: 'Recipes',
      items: [
        {
          title: 'All Recipes',
          href: '/recipes',
          description: 'All the recipes we have to offer.',
          items: [],
        },
        {
          title: 'Dinner Recipes',
          href: '/recipes',
          description: 'All the dinner recipes we have to offer.',
          items: [],
        },
        {
          title: 'Paid Recipes',
          href: '/recipes',
          description: 'All the paid recipes we have to offer.',
          items: [],
        },
        {
          title: 'Lunch Recipes',
          href: '/recipes',
          description: 'All the lunch recipes we have to offer.',
          items: [],
        },
        {
          title: 'Free Recipes',
          href: '/recipes',
          description: 'All the free recipes we have to offer.',
          items: [],
        },
        {
          title: 'Breakfast Recipes',
          href: '/recipes',
          description: 'All the breakfast recipes we have to offer.',
          items: [],
        },
      ],
    },
    {
      title: 'Meal Plans',
      items: [
        {
          title: 'All Meal Plans',
          href: '/meal-plans',
          description: 'All the meal plans we have to offer.',
          items: [],
        },
        {
          title: 'Paid Meal Plans',
          href: '/meal-plans',
          description: 'All the paid meal plans we have to offer.',
          items: [],
        },
        {
          title: 'Free Meal Plans',
          href: '/meal-plans',
          description: 'All the free meal plans we have to offer.',
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: 'Credits',
      items: [
        {
          title: 'Skateshop',
          href: 'https://skateshop.sadmn.com/',
          external: true,
        },
        {
          title: 'quill - Joscha Neske',
          href: 'https://github.com/joschan21/quill',
          external: true,
        },
      ],
    },
    {
      title: 'Help',
      items: [
        {
          title: 'About',
          href: '/about',
          external: false,
        },
        {
          title: 'Contact',
          href: '/contact',
          external: false,
        },
        {
          title: 'Privacy',
          href: '/privacy',
          external: false,
        },
        {
          title: 'Terms',
          href: '/terms',
          external: false,
        },
      ],
    },
    {
      title: 'Social',
      items: [
        {
          title: 'Twitter',
          href: links.twitter,
          external: true,
        },
        {
          title: 'GitHub',
          href: links.githubAccount,
          external: true,
        },
        {
          title: 'Discord',
          href: links.discord,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
