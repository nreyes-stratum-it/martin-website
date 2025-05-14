import type {Metadata} from 'next';
import {normalizeSlug} from '@/lib/utils/normalize-slug';
import {getMediaUrl} from '@/lib/helpers/media/media';
import {toFrontendUrl} from '@/lib/utils/to-frontend-url';
import {Metadata as MetadataProps} from '@/lib/types/routing/metadata';
import {DEFAULT_LOCALE} from "@/lib/const/locale/locale";

const FALLBACK_OG = '/img/next-js.jpg';

const DEFAULT_METADATA: Metadata = {
    title: 'Website Title',
    description: 'Website Description',
};

export function buildNextMetadata(src: MetadataProps | null): Metadata {
    if (!src) return DEFAULT_METADATA;

    const title =
        src.seo.metaTitle ?? src.title ?? 'Website Title';
    const description =
        src.seo.metaDescription ?? src.description ?? 'Website Description';

    const ogImageUrl = src.seo.sharedImage
        ? getMediaUrl(src.seo.sharedImage.url)
        : toFrontendUrl(FALLBACK_OG);

    const hasEnglishVersion = Boolean(src.localizations?.en);

    const canonicalUrl = hasEnglishVersion
        ? normalizeSlug(src.localizations.en!)
        : normalizeSlug(src.slug);

    const altLanguages: Record<string, string> = {
        ...(hasEnglishVersion && {en: normalizeSlug(src.localizations.en!)}),
        ...Object.entries(src.localizations).reduce((acc, [lng, slug]) => {
            if (lng === DEFAULT_LOCALE) return acc;
            acc[lng] = `/${lng}${normalizeSlug(slug)}`;
            return acc;
        }, {} as Record<string, string>),
        [src.locale]: src.locale === DEFAULT_LOCALE
            ? canonicalUrl
            : `/${src.locale}${normalizeSlug(src.slug)}`,

    };

    const robots: Metadata['robots'] = {
        index: !src.preventIndexing,
        follow: true,
    };

    const meta: Metadata = {
        title,
        description,
        keywords: src.keywords,
        robots,
        alternates: {
            canonical: canonicalUrl,
            languages: altLanguages,
        },
        openGraph: {
            title,
            description,
            type: src.collection === 'post' ? 'article' : 'website',
            siteName: 'Hashlabs',
            locale: src.locale.replace('-', '_'),
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: src.seo.sharedImage?.alt ?? '',
                },
            ],
            authors: src.author ? [src.author] : undefined,
            publishedTime: src.publishedAt ?? undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
    };

    return meta;
}
