import {z} from 'zod';

const ChangeFreqEnum = z.enum([
    'always',
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'never',
]);

export const SitemapEntrySchema = z.object({
    url: z.string().regex(/^\/.*/),
    lastModified: z.string().datetime(),
    changeFrequency: ChangeFreqEnum.optional(),
    priority: z.number().min(0).max(1).optional(),

    alternates: z
        .object({
            languages: z.record(z.string()), // { en: '/blog/foo', es: '/es/blog/foo', … }
        })
        .optional(),
});

export const SitemapSchema = z.array(SitemapEntrySchema);


