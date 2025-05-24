import {HttpClient} from "@/lib/config/http-client";
import {HeaderData} from "@/lib/types/global/header/header";
import {HeaderSchema} from "@/lib/schemas/global/header/header";

export class StrapiGlobalProvider {

    constructor(private readonly httpClient: HttpClient) {
    }

    async getHeader(locale: string): Promise<HeaderData | null> {


        try {
            const {data} = await this.httpClient.get<{ header: HeaderData }>(
                `/global/header?locale=${encodeURIComponent(locale)}`
            );

            const rawData = data.header

            if (!rawData) {
                console.error("No header data found in response");
                return null;
            }

            const parsed = HeaderSchema.safeParse(rawData);

            if (!parsed.success) {
                console.error("Failed to parse header:", parsed.error);
                return null;
            }

            return parsed.data;
        } catch (error) {
            console.error("Error fetching header:", error);
            return null;
        }
    }


}