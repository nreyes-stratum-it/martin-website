import {PageService} from "@/lib/services/page-service";
import {StrapiPageProvider} from "@/lib/providers/page/strapi-page-provider";
import type {PageProvider} from "@/lib/interfaces/providers/page";
import {httpClient} from "@/lib/config/instances";

const providerMap: Record<string, () => PageProvider> = {
    strapi: () => new StrapiPageProvider(httpClient),

};

export function createPageService(): PageService {
    const providerKey = process.env.NEXT_PUBLIC_PROVIDER?.toLowerCase() || "json";


    const factory = providerMap[providerKey];

    if (!factory) {
        throw new Error(
            `Invalid NEXT_PUBLIC_PROVIDER: '${providerKey}'. Valid options: ${Object.keys(providerMap).join(", ")}`
        );
    }

    const provider = factory();
    return new PageService(provider);
}
