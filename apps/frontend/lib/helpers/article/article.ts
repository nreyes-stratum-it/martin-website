import {DEFAULT_LOCALE} from "@/lib/const/locale/locale";

export const stripDefaultLocaleFromPath = (href: string | undefined): string => {
    if (!href) return "";

    const segments = href.split("/").filter(Boolean);

    if (segments[0] === DEFAULT_LOCALE) {
        return "/" + segments.slice(1).join("/");
    }

    return "/" + segments.join("/");
};
