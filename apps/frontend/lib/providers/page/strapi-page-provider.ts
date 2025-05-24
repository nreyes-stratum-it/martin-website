import {PageProvider} from "@/lib/interfaces/providers/page";
import {HttpClient} from "@/lib/config/http-client";
import {PagesData} from "@/lib/types/pages/pages";
import {PagesSchema} from "@/lib/schemas/page/page";
import {StrapiResponse} from "@/lib/types/strapi/response";

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

}