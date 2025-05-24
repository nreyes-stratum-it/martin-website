import {StrapiRoutingProvider} from "@/lib/providers/routing/strapi-routing-provider";
import {httpClient} from "@/lib/config/instances";
import fs from "fs";
import path from "path";
import {normalizeSlug} from "@/lib/utils/normalize-slug";
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from "@/lib/const/locale/locale";

export async function exportRoutingData() {
    const provider = new StrapiRoutingProvider(httpClient);
    const exportPath = path.join(process.cwd(), "data/routing");
    fs.mkdirSync(exportPath, {recursive: true});

    const staticParams = await provider.getStaticParams();
    if (staticParams) {
        fs.writeFileSync(path.join(exportPath, "static-params.json"), JSON.stringify(staticParams, null, 2));
    }

    const sitemap = await provider.getSiteMap();
    if (sitemap) {
        fs.writeFileSync(path.join(exportPath, "sitemap.json"), JSON.stringify(sitemap, null, 2));
    }

    const locales = [DEFAULT_LOCALE, ...SUPPORTED_LOCALES.filter(l => l !== DEFAULT_LOCALE)];

    if (staticParams) {
        const visited = new Set<string>();

        for (const param of staticParams) {
            const baseSlugPath = normalizeSlug(param.slug.join("/"));
            const baseSlug = baseSlugPath === "/" ? "" : baseSlugPath.slice(1);

            for (const locale of locales) {
                const key = `${baseSlug}|${locale}`;
                if (visited.has(key)) continue;
                visited.add(key);

                const [metadata, localizations] = await Promise.all([
                    provider.getMetadata(baseSlug, locale),
                    provider.getLocalizationsBySlug(baseSlug, locale),
                ]);

                if (metadata) {
                    const baseName = baseSlug || "home";
                    const filename = `${baseName}.${locale}.json`;
                    const filePath = path.join(exportPath, "metadata", filename);
                    fs.mkdirSync(path.dirname(filePath), {recursive: true});
                    fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));
                    console.log(`✔ metadata/${filename} saved`);
                }

                if (localizations?.length) {
                    const baseName = baseSlug || "home";
                    const locFilename = `${baseName}.${locale}.localizations.json`;
                    const locPath = path.join(exportPath, "localizations", locFilename);
                    fs.mkdirSync(path.dirname(locPath), {recursive: true});
                    fs.writeFileSync(locPath, JSON.stringify(localizations, null, 2));
                    console.log(`✔ localizations/${locFilename} saved`);

                    // 👇 Agrega también los localizations a la cola (si aún no fueron visitados)
                    for (const loc of localizations) {
                        const locSlug = normalizeSlug(loc?.slug);
                        const locBase = locSlug.slice(1); // quita /
                        const locKey = `${locBase}|${loc?.locale}`;
                        if (!visited.has(locKey)) {
                            staticParams.push({slug: locBase.split("/")}); // agrega para siguiente ronda
                        }
                    }
                }
            }
        }

    }
}
