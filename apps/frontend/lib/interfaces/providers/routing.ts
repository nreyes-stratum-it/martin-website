import {StaticParams} from "@/lib/types/routing/static-params";
import type {MetadataRoute} from "next";
import {Metadata} from "@/lib/types/routing/metadata";

export interface RoutingProvider {
    getStaticParams(): Promise<StaticParams | null>;
    getMetadata(slug: string, locale: string): Promise<Metadata | null>;
    getSiteMap(): Promise<MetadataRoute.Sitemap | null>;
}
