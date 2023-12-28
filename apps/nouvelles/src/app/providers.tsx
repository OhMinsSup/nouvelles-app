'use client';
import { AxiomWebVitals } from 'next-axiom';
import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { AppProvider } from '~/libs/providers/app';

interface ProvidersProps {
  children: React.ReactNode;
  theme?: ThemeProviderProps;
  isCORS?: boolean;
}

export function Providers({ children, theme, isCORS }: ProvidersProps) {
  return (
    <>
      <ThemeProvider {...theme}>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
      {!isCORS && <AxiomWebVitals />}
    </>
  );
}
