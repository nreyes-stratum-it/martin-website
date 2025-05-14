import type {Context} from 'koa';
import {normalizeSlug} from "../../../utils/normalize-slug";


declare const strapi: any;


export default {

    async staticParams(ctx: Context) {
        try {
            const localesData = await strapi.service('plugin::i18n.locales').find();
            const localeCodes: string[] = localesData.map((l: { code: string }) => l.code);

            const allContentTypes = Object.keys(strapi.contentTypes).filter((key: string) =>
                key.startsWith('api::'),
            );

            const blacklist: string[] = [];
            const filtered = allContentTypes.filter((t) => !blacklist.includes(t));

            const results = await Promise.all(
                filtered.map(async (typeName: string) => {
                    const model = strapi.contentTypes[typeName];
                    if (!model.attributes?.slug) return null;

                    const service = strapi.service(typeName);

                    const allSlugs: { slug: string[] }[] = [];

                    for (const locale of localeCodes) {
                        const queryRes = await service.find({
                            fields: ['slug'],
                            status: 'published',
                            locale,
                        });

                        const items = (queryRes?.results || queryRes) as { slug: string }[];

                        items.forEach(({slug}) => {
                            if (!slug) return;

                            const cleaned = slug.replace(/^\/+/, '').replace(/\/+$/, '');
                            const segments = cleaned.split('/').filter(Boolean);

                            if (locale === 'en') {
                                allSlugs.push({slug: segments});
                            } else {
                                allSlugs.push({slug: [locale, ...segments]});
                            }
                        });
                    }

                    return allSlugs;
                }),
            );

            const flatSlugs = results.filter(Boolean).flat();
            ctx.body = flatSlugs;
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                error: 'Error generating slugs',
                details: (error as Error).message ?? 'Unknown error',
            };
        }
    },

    async sitemap(ctx: Context) {
        try {

            const localesData = await strapi.service('plugin::i18n.locales').find();
            const localeCodes: string[] = localesData.map((l: { code: string }) => l.code);
            const canonicalLocale = localeCodes.includes('en') ? 'en' : localeCodes[0];

            const allContentTypes = Object.keys(strapi.contentTypes).filter((key: string) =>
                key.startsWith('api::'),
            );

            const blacklist: string[] = [];
            const filtered = allContentTypes.filter((t) => !blacklist.includes(t));

            const canonicalEntries = await Promise.all(
                filtered.map(async (typeName: string) => {
                    const model = strapi.contentTypes[typeName];
                    if (!model.attributes?.slug) return null;

                    const items = await strapi.entityService.findMany(typeName, {
                        status: 'published',
                        populate: {localizations: true},
                        locale: canonicalLocale,

                    });

                    return items.map((entry: any) => ({
                        slug: entry.slug,
                        locale: entry.locale,
                        updatedAt: entry.updatedAt,
                        localizations: (entry.localizations ?? [])
                            .filter((loc: any) => loc.publishedAt)
                            .map((loc: any) => ({
                                slug: loc.slug,
                                locale: loc.locale,
                                updatedAt: loc.updatedAt,
                            })),
                    }));
                }),
            );

            const basePages = canonicalEntries.filter(Boolean).flat();

            const sitemap = basePages.map((page) => {
                const {slug, locale, updatedAt, localizations} = page;

                const langs: Record<string, string> = {};

                const canonicalSlug = normalizeSlug(slug);
                const canonicalPath =
                    locale === canonicalLocale ? canonicalSlug : `/${locale}${canonicalSlug}`;

                langs[locale] = canonicalPath;

                for (const loc of localizations ?? []) {
                    if (!loc?.slug || !loc?.locale) continue;

                    const localizedSlug = normalizeSlug(loc.slug);
                    const localizedPath =
                        loc.locale === canonicalLocale
                            ? localizedSlug
                            : `/${loc.locale}${localizedSlug}`;

                    langs[loc.locale] = localizedPath;
                }

                const allUpdates = [updatedAt, ...(localizations ?? []).map((l) => l.updatedAt)];
                const lastModified = allUpdates
                    .map((d) => new Date(d))
                    .sort((a, b) => b.getTime() - a.getTime())[0];

                const canonicalUrl = langs[canonicalLocale] || Object.values(langs)[0];

                return {
                    url: canonicalUrl,
                    lastModified,
                    changeFrequency: 'weekly',
                    priority: 0.7,
                    alternates: {languages: langs},
                };
            });

            ctx.body = sitemap;
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                error: 'Error generating sitemap',
                details: (error as Error).message ?? 'Unknown error',
            };
        }
    },
    async metadata(ctx: Context) {
        try {
            /* -------- inputs -------- */
            const rawSlug = (ctx.query.slug as string | undefined) ?? '/';
            const locale = (ctx.query.locale as string | undefined) ?? 'en';
            const clean = normalizeSlug(rawSlug);        // '/about' → '/about'

            /* -------- content-types que tienen slug + seo -------- */
            const candidates = Object.keys(strapi.contentTypes).filter((uid) => {
                const m = strapi.contentTypes[uid];
                return (
                    uid.startsWith('api::') &&
                    m.attributes?.slug &&
                    m.attributes?.seo?.type === 'component'
                );
            });

            let matched: any = null;
            let collection = '';

            for (const uid of candidates) {
                const model = strapi.contentTypes[uid];
                const withAuthor = !!model.attributes.author;

                const [entry] = await strapi.entityService.findMany(uid, {
                    locale,
                    status: 'published',
                    filters: {slug: clean},
                    populate: {
                        seo: {populate: {media: {populate: ['image']}}},
                        keywords: {fields: ['text']},
                        localizations: {
                            fields: ['slug', 'locale'],
                        },
                        ...(withAuthor && {author: {fields: ['name']}}),
                    },
                    limit: 1,
                });

                if (entry) {
                    matched = entry;
                    collection = uid.split('::')[1].split('.')[0];
                    break;
                }
            }

            if (!matched) {
                ctx.status = 404;          // mejor un 404 que 204
                ctx.body = {error: 'Not found'};
                return;
            }

            /* -------- procesa keywords -------- */

            console.log(matched.keywords)

            const kw = Array.isArray(matched.keywords)
                ? matched.keywords.map((k: any) => k?.text?.trim()).filter((s: string | undefined): s is string => !!s)
                : typeof matched.keywords === 'string'
                    ? matched.keywords.split(',').map((s: string) => s.trim()).filter(Boolean)
                    : [];

            /* -------- mapea localizations -------- */
            const locs: Record<string, string> = {};
            (matched.localizations ?? []).forEach((l: any) => {
                locs[l.locale] = normalizeSlug(l.slug);
            });

            /* -------- shared image -------- */
            const img =
                matched.seo?.media?.image
                    ? {
                        url: matched.seo.media.image.url,
                        alt: matched.seo.media.alt ?? '',
                    }
                    : null;

            /* -------- respuesta -------- */
            ctx.body = {
                collection,
                slug: clean,
                locale: matched.locale,
                title: matched.title ?? '',
                description: matched.description ?? '',
                keywords: kw,
                preventIndexing: matched.preventIndexing ?? false,
                publishedAt: matched.publishedAt ?? null,
                updatedAt: matched.updatedAt,
                localizations: locs,          // ← para alternates.languages
                seo: {
                    metaTitle: matched.seo?.meta_title ?? null,
                    metaDescription: matched.seo?.meta_description ?? null,
                    sharedImage: img,
                },
                author: matched.author?.name ?? null,
            };
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                error: 'metadata error',
                details: (err as Error).message ?? 'Unknown error',
            };
        }
    },
    async localizations(ctx: Context) {
        const rawSlug = (ctx.query.slug as string | undefined) ?? '/';
        const locale = (ctx.query.locale as string | undefined)?.trim() ?? 'en';
        const slug = normalizeSlug(rawSlug);

        if (!slug || !locale) {
            ctx.status = 400;
            ctx.body = {error: 'Missing slug or locale parameter'};
            return;
        }

        const candidates = Object.keys(strapi.contentTypes).filter(
            (uid) =>
                uid.startsWith('api::') &&
                strapi.contentTypes[uid].attributes?.slug &&
                strapi.contentTypes[uid].pluginOptions?.i18n?.localized
        );

        let target: any = null;

        for (const uid of candidates) {
            const [entry] = await strapi.entityService.findMany(uid, {
                locale,
                publicationState: 'live',
                filters: {slug},
                populate: {
                    localizations: {
                        fields: ['slug', 'locale', 'title', 'updatedAt'],
                    },
                },
                limit: 1,
            });

            if (entry) {
                target = entry;
                break;
            }
        }

        if (!target) {
            ctx.status = 404;
            ctx.body = {error: 'Not found'};
            return;
        }

        const result = [
            {
                slug: normalizeSlug(target.slug),
                locale: target.locale,
                title: target.title ?? '',
                updatedAt: target.updatedAt,
            },
            ...(target.localizations ?? []).map((l: any) => ({
                slug: normalizeSlug(l.slug),
                locale: l.locale,
                title: l.title ?? '',
                updatedAt: l.updatedAt,
            })),
        ];

        ctx.body = result;
    },
}

