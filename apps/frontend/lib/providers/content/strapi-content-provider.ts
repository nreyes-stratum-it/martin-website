import {HttpClient} from "@/lib/config/http-client";

export class StrapiContentProvider {
    constructor(private readonly httpClient: HttpClient) {
    }

    /* async getContentBySlug(slug: string, locale: string): Promise<Content | null> {
         try {
             const {data} = await this.httpClient.get<StrapiResponse<unknown>>(`/content/by-slug?slug=${encodeURIComponent(slug)}&locale=${encodeURIComponent(locale)}`);
             const rawData = data;

             if (!rawData) {
                 console.error("No content found for slug:", slug);
                 return null;
             }

             const parsed = ContentSchema.safeParse(rawData);

             if (!parsed.success) {
                 console.error("Failed to parse content response:", parsed.error);
                 return null;
             }

             return parsed.data;
         } catch (error) {
             console.error("Error fetching content by slug:", error);
             return null;
         }
     }*/
}