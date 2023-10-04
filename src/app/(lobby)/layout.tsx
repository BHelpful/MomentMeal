import { SiteFooter } from '@/components/layouts/site-footer';
import { SiteHeader } from '@/components/layouts/site-header';
import { cn, constructMetadata } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className={cn('relative flex min-h-screen flex-col', inter.className)}>
      {/* <Navbar /> */}
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
