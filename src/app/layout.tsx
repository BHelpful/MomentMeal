import { Analytics } from '@/components/analytics';
import Providers from '@/components/providers';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import { env } from '@/env.mjs';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Server Actions',
    'MealTime',
  ],
  authors: [
    {
      name: 'bhelpful',
      url: 'https://github.com/bhelpful',
    },
  ],
  creator: 'bhelpful',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@bhelpful',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="light">
        <body
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Providers attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
            <Analytics />
          </Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
