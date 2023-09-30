import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { cn, constructMetadata } from '@/lib/utils';
import { Inter } from 'next/font/google';
import './globals.css';

import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <body
                className={cn(
                    'min-h-screen font-sans antialiased  bg-background-50',
                    inter.className
                )}
            >
                <Providers attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    {children}
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
