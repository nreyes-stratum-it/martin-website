import {RoutingProvider} from "@/lib/interfaces/providers/routing";
import {StaticParams} from "@/lib/types/routing/static-params";
import type {MetadataRoute} from "next";
import {Metadata} from "@/lib/types/routing/metadata";

export class RoutingService implements RoutingProvider {
    constructor(private readonly staticParamsProvider: RoutingProvider) {
    }

    async getMetadata(slug: string, locale: string): Promise<Metadata | null> {
        return this.staticParamsProvider.getMetadata(slug, locale);
    }

    async getSiteMap(): Promise<MetadataRoute.Sitemap | null> {
        return this.staticParamsProvider.getSiteMap();
    }

    async getStaticParams(): Promise<StaticParams | null> {
        return this.staticParamsProvider.getStaticParams();
    }
}
