import {PageProvider} from "@/lib/interfaces/providers/page";
import {PagesData} from "@/lib/types/pages/pages";

export class PageService implements PageProvider {
    constructor(private readonly pageProvider: PageProvider) {
    }


    async getPageBySlug(slug: string, locale: string): Promise<PagesData | null> {
        return this.pageProvider.getPageBySlug(slug, locale);
    }

}