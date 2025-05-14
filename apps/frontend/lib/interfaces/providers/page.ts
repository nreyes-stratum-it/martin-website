import {PagesData} from "@/lib/types/pages/pages";
import {LocalizationData} from "@/lib/types/localizations/localization";

export interface PageProvider {
    getPageBySlug: (slug: string, locale: string) => Promise<PagesData | null>;
    getPageLanguageVariants: (slug: string, locale: string) => Promise<LocalizationData[] | null>;
}