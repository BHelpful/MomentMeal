import { SiteFooter } from '@/components/layouts/site-footer';
import { SiteHeader } from '@/components/layouts/site-header';
import { fontHeading, fontMono, fontSans } from '@/lib/fonts';
import { cn, constructMetadata } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable,
        fontMono.variable,
        fontHeading.variable
      )}
    >
      {/* <Navbar /> */}
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
