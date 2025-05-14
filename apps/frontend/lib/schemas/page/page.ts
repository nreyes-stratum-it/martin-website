import z from "zod";
import {LocalizationSchema} from "@/lib/schemas/localizations/localization";
import {ContentSchema} from "@/lib/schemas/content/content";


export const PagesSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    locale: z.string().optional(),
    description: z.string().optional(),
    updatedAt: z.string().optional(),
    localizations: z.array(LocalizationSchema).optional().nullable(),
    content: ContentSchema.optional().nullable()
})