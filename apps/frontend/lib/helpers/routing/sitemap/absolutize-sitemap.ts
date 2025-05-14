import type {MetadataRoute} from 'next';
import {toFrontendUrl} from "@/lib/utils/to-frontend-url";


export const absolutizeSitemap = (
    relative: MetadataRoute.Sitemap,
): MetadataRoute.Sitemap =>
    relative.map((e) => ({
        ...e,
        url: toFrontendUrl(e.url),

        alternates: e.alternates?.languages
            ? {
                languages: Object.fromEntries(
                    Object.entries(e.alternates.languages ?? {})
                        .filter(
                            (entry): entry is [string, string] =>
                                typeof entry[1] === 'string',
                        )
                        .map(([k, p]) => [k, toFrontendUrl(p)]),
                ),
            }
            : undefined,
    }));
