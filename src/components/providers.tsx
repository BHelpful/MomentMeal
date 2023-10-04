'use client';

import { trpc } from '@/app/_trpc/client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { absoluteUrl } from '@/lib/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useState } from 'react';

const Providers = ({ children, ...props }: ThemeProviderProps) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: absoluteUrl('/api/trpc'),
                }),
            ],
        })
    );

    return (
        <NextThemesProvider {...props}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider>{children}</TooltipProvider>
                </QueryClientProvider>
            </trpc.Provider>
        </NextThemesProvider>
    );
};

export default Providers;
