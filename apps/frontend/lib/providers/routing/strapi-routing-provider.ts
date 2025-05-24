import {HttpClient} from "@/lib/config/http-client";
import {RoutingProvider} from "@/lib/interfaces/providers/routing";
import {SitemapSchema} from "@/lib/schemas/routing/sitemap";
import {StaticParams} from "@/lib/types/routing/static-params";
import type {MetadataRoute} from "next";
import {Metadata} from "@/lib/types/routing/metadata";
import {MetadataSchema} from "@/lib/schemas/routing/metadata";
import {LocalizationData} from "@/lib/types/localizations/localization";
import {LocalizationSchema} from "@/lib/schemas/localizations/localization";

export class StrapiRoutingProvider implements RoutingProvider {
    constructor(private readonly httpClient: HttpClient) {
    }

    async getStaticParams(): Promise<StaticParams | null> {
        try {
            const {data} = await this.httpClient.get<{ slug: string[] }[]>("/routing/static-params");
            return data;
        } catch (error) {
            console.error("Error fetching static params:", error);
            return null;
        }
    }

    async getSiteMap(): Promise<MetadataRoute.Sitemap | null> {
        try {
            const {data} = await this.httpClient.get('/routing/sitemap');

            const parsed = SitemapSchema.safeParse(data);
            if (!parsed.success) {
                console.error('Sitemap validation failed', parsed.error);
                return null;
            }
            return parsed.data;
        } catch (err) {
            console.error('Error fetching sitemap', err);
            return null;
        }
    }

    async getMetadata(slug: string, locale: string): Promise<Metadata | null> {
        try {
            const {data} = await this.httpClient.get('/routing/metadata', {
                params: {slug, locale},
            });

            const parsed = MetadataSchema.safeParse(data);

            if (!parsed.success) {
                console.error('Metadata payload validation failed', parsed.error);
                return null;
            }

            return parsed.data;
        } catch (err) {
            console.error('Error fetching metadata', err);
            return null;
        }
    }


    async getLocalizationsBySlug(slug: string, locale: string): Promise<LocalizationData[] | null> {
        try {
            const {data} = await this.httpClient.get('/routing/localizations', {
                params: {slug, locale},
            });
            return LocalizationSchema.array().parse(data);
        } catch (err) {
            console.error('Error fetching localizations', err);
            return null;
        }
    }

}