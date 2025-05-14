import {HeaderData} from "@/lib/types/global/header/header";
import {MenuLinkData} from "@/lib/types/navigation/menu-link";

export function prefixMenuLinks(header?: HeaderData, locale?: string): HeaderData | null {

    if (!header) return null;

    const shouldPrefix = locale !== "en";

    const addPrefix = (url: string, isExternal?: boolean): string => {
        if (isExternal || url.startsWith("http")) return url;
        if (!shouldPrefix) return url;
        if (url === "/") return `/${locale}`;
        return `/${locale}${url}`.replace(/\/{2,}/g, "/");
    };

    const updatedMenuLinks: MenuLinkData[] = header?.menu_link.map((menuItem) => ({
        ...menuItem,
        link: {
            ...menuItem.link,
            url: addPrefix(menuItem.link.url, menuItem.link.isExternal),
        },
        submenu_link: menuItem.submenu_link
            ? {
                ...menuItem.submenu_link,
                link: menuItem.submenu_link.link.map((sub) => ({
                    ...sub,
                    url: addPrefix(sub.url, sub.isExternal),
                })),
            }
            : null,
    }));

    return {
        ...header,
        menu_link: updatedMenuLinks,
    };
}