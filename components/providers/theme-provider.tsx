"use client"

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component wraps its children with the NextThemesProvider.
 * This provider facilitates theme switching and provides theme-related utilities.
 * 
 * @param {ThemeProviderProps} props - Props for configuring the NextThemesProvider.
 * @returns The ThemeProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
