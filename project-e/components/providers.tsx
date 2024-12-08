"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SearchProvider } from '@/lib/context/search-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SearchProvider>
        {children}
      </SearchProvider>
      <Toaster />
    </ThemeProvider>
  );
}