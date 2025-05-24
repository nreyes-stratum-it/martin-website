import type {MetadataRoute} from 'next'
import {absolutizeSitemap} from "@/lib/helpers/routing/sitemap/absolutize-sitemap";
import {createRoutingService} from "@/lib/factories/create-routing-service";

export const dynamic = 'force-static'
export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const relativeSitemap = await createRoutingService().getSiteMap();
    if (!relativeSitemap) return [];
    return absolutizeSitemap(relativeSitemap);
}