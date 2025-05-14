import {PageProvider} from "@/lib/interfaces/providers/page";
import {PagesData} from "@/lib/types/pages/pages";
import {LocalizationData} from "@/lib/types/localizations/localization";

export class PageService implements PageProvider {
    constructor(private readonly pageProvider: PageProvider) {
    }


    async getPageBySlug(slug: string, locale: string): Promise<PagesData | null> {
        return this.pageProvider.getPageBySlug(slug, locale);
    }

    async getPageLanguageVariants(slug: string, locale: string): Promise<LocalizationData[] | null> {
        return this.pageProvider.getPageLanguageVariants(slug, locale);
    }
}