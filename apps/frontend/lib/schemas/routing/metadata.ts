import {z} from 'zod';

export const MetadataSchema = z.object({
    collection: z.string(),
    slug: z.string(),
    locale: z.string(),
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional().default([]),
    preventIndexing: z.boolean(),
    publishedAt: z.string().nullable(),
    updatedAt: z.string(),
    localizations: z.record(z.string()).optional().default({}),
    seo: z.object({
        metaTitle: z.string().nullable(),
        metaDescription: z.string().nullable(),
        sharedImage: z
            .object({
                url: z.string(),
                alt: z.string(),
            })
            .nullable(),
    }),
    author: z.string().nullable(),
});

