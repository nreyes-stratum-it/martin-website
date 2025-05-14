import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from "@/lib/const/locale/locale";

export function resolveLocaleAndSlug(segments: string[]): {
    locale: string;
    slugPart: string[];
} {
    if (segments[0] && SUPPORTED_LOCALES.includes(segments[0])) {
        return {
            locale: segments[0],
            slugPart: segments.slice(1),
        };
    }

    return {
        locale: DEFAULT_LOCALE,
        slugPart: segments,
    };
}

