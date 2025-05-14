import {z} from 'zod';
import {LocalizationSchema} from "@/lib/schemas/localizations/localization";

export const PagePathSchema = z.object({
    slug: z.string(),
    locale: z.string(),
    updatedAt: z.coerce.date(),
    localizations: z.array(LocalizationSchema).optional().nullable(),
});

export const PagePathsSchema = z.array(PagePathSchema);
