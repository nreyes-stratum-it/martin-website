import type {MetadataRoute} from 'next'
import {httpClient} from "@/lib/config/instances";
import {StrapiRoutingProvider} from "@/lib/providers/routing/strapi-routing-provider";
import {absolutizeSitemap} from "@/lib/helpers/routing/sitemap/absolutize-sitemap";

export const dynamic = 'force-static'
export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const relativeSitemap = await new StrapiRoutingProvider(httpClient).getSiteMap();
    if (!relativeSitemap) return [];
    return absolutizeSitemap(relativeSitemap);
}