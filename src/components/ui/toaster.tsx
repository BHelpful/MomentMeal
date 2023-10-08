'use client';

import { Toaster as RadToaster } from 'sonner';

export function Toaster() {
  return (
    <RadToaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
      }}
    />
  );
}
