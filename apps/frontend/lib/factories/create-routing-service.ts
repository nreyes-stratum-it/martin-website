import {RoutingService} from "@/lib/services/routing-service";
import {httpClient} from "@/lib/config/instances";
import {StrapiRoutingProvider} from "@/lib/providers/routing/strapi-routing-provider";
import {RoutingProvider} from "@/lib/interfaces/providers/routing";
import {JsonRoutingProvider} from "@/lib/providers/routing/json-routing-provider";

const providerMap: Record<string, () => RoutingProvider> = {
    strapi: () => new StrapiRoutingProvider(httpClient),
    json: () => new JsonRoutingProvider(),

};


export const createRoutingService = (): RoutingService => {
    const providerKey = process.env.NEXT_PUBLIC_PROVIDER?.toLowerCase() || "json";
    const factory = providerMap[providerKey];

    if (!factory) {
        throw new Error(
            `Invalid NEXT_PUBLIC_STATIC_PARAMS_PROVIDER: '${providerKey}'. Valid options: ${Object.keys(providerMap).join(", ")}`
        );
    }

    const provider = factory();

    return new RoutingService(provider);
}