import {z} from 'zod';

export const LocalizationSchema = z.object({
    slug: z.string().optional(),
    locale: z.string().optional(),
    title: z.string().optional(),
    updatedAt: z.string().optional(),
}).optional().nullable();