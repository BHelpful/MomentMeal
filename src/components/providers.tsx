'use client';

import TrpcProvider from '@/app/_trpc/provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <TrpcProvider>
      <NextThemesProvider {...props}>
        <SpeedInsights />
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
    </TrpcProvider>
  );
};

export default Providers;
