"use client";

import type {ThemeProviderProps} from "next-themes";
import {HeroUIProvider} from "@repo/ui-hero";
import {useRouter} from "next/navigation";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <NextThemesProvider
                enableSystem={true}
                value={{
                    light: "light",
                    dark: "dark",
                }}
                {...themeProps}
            >
                {children}
            </NextThemesProvider>
        </HeroUIProvider>
    );
}
