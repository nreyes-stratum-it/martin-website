import fs from "fs/promises";
import path from "path";
import {RoutingProvider} from "@/lib/interfaces/providers/routing";
import {SitemapSchema} from "@/lib/schemas/routing/sitemap";
import {MetadataSchema} from "@/lib/schemas/routing/metadata";
import {LocalizationSchema} from "@/lib/schemas/localizations/localization";
import {StaticParams} from "@/lib/types/routing/static-params";
import type {MetadataRoute} from "next";
import {Metadata} from "@/lib/types/routing/metadata";
import {LocalizationData} from "@/lib/types/localizations/localization";

export class JsonRoutingProvider implements RoutingProvider {
    constructor(private readonly dataDir = path.join(process.cwd(), "data/routing")) {
    }

    private async readJson<T>(file: string): Promise<T | null> {
        try {
            const raw = await fs.readFile(file, "utf-8");
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    async getStaticParams(): Promise<StaticParams | null> {
        return this.readJson<StaticParams>(path.join(this.dataDir, "static-params.json"));
    }

    async getSiteMap(): Promise<MetadataRoute.Sitemap | null> {
        const data = await this.readJson(path.join(this.dataDir, "sitemap.json"));
        const parsed = SitemapSchema.safeParse(data);
        return parsed.success ? parsed.data : null;
    }

    async getMetadata(slug: string, locale: string): Promise<Metadata | null> {
        const base = slug === "/" ? "home" : slug;              // "" ⇒ home
        const file = path.join(this.dataDir, "metadata", `${base}.${locale}.json`);
        const data = await this.readJson(file);
        const parsed = MetadataSchema.safeParse(data);
        return parsed.success ? parsed.data : null;
    }

    async getLocalizationsBySlug(slug: string, locale: string): Promise<LocalizationData[] | null> {
        const base = slug === "/" ? "home" : slug;
        const file = path.join(this.dataDir, "localizations", `${base}.${locale}.localizations.json`);
        const data = await this.readJson(file);
        const parsed = LocalizationSchema.array().safeParse(data);
        return parsed.success ? parsed.data : null;
    }
}
