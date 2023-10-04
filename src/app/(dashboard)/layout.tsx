import { SiteFooter } from '@/components/layouts/site-footer';
import { SiteHeader } from '@/components/layouts/site-header';
import { cn } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

const inter = Inter({ subsets: ['latin'] });

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
