import {PageProvider} from "@/lib/interfaces/providers/page";
import {HttpClient} from "@/lib/config/http-client";
import {PagesData} from "@/lib/types/pages/pages";
import {PagesSchema} from "@/lib/schemas/page/page";
import {StrapiResponse} from "@/lib/types/strapi/response";
import {LocalizationData} from "@/lib/types/localizations/localization";
import {parseLocalizations} from "@/lib/helpers/routing/parse-localizations";

export class StrapiPageProvider implements PageProvider {
    constructor(private readonly httpClient: HttpClient) {
    }

    async getPageBySlug(slug: string, locale: string): Promise<PagesData | null> {

        try {
            const {data} = await this.httpClient.get<StrapiResponse<unknown>>(`/pages/by-slug?slug=${encodeURIComponent(slug)}&locale=${encodeURIComponent(locale)}`);
            const rawData = data;

            if (!rawData) {
                console.error("No page found for slug:", slug);
                return null;
            }

            console.log(JSON.stringify(rawData, null, 2));

            const parsed = PagesSchema.safeParse(rawData);

            if (!parsed.success) {
                console.error("Failed to parse page response:", parsed.error);
                return null;
            }

            return parsed.data;
        } catch (error) {
            console.error("Error fetching page by slug:", error);
            return null;
        }
    }




    async getPageLanguageVariants(slug: string, locale: string): Promise<LocalizationData[] | null> {
        try {
            const url = `/pages?slug=${encodeURIComponent(slug)}&locale=${encodeURIComponent(locale)}`;
            const {data} = await this.httpClient.get<StrapiResponse<unknown>>(url);

            const rawPageData = data?.data;
            if (!rawPageData) {
                console.error("No page found for slug:", slug);
                return null;
            }

            const pageParsed = PagesSchema.safeParse(rawPageData);
            if (!pageParsed.success) {
                console.error("Failed to parse page schema:", pageParsed.error);
                return null;
            }
            const {
                title,
                slug: pageSlug,
                locale: pageLocale,
                updatedAt,
                localizations
            } = pageParsed.data;

            return [
                {title, slug: pageSlug, locale: pageLocale, updatedAt},
                ...parseLocalizations(localizations ?? [])
            ];

        } catch (error) {
            console.error("Error fetching language variants:", error);
            return null;
        }
    }


}