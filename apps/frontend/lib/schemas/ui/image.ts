import {z} from "zod";
import {UI} from "@/lib/const/components/ui/components-key";

export const ImageFormatSchema = z.object({
    ext: z.string(),
    url: z.string(),
    hash: z.string(),
    mime: z.string(),
    name: z.string(),
    path: z.string().nullable(),
    size: z.number(),
    width: z.number(),
    height: z.number(),
    sizeInBytes: z.number(),
});

export const ImageSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    name: z.string(),
    alternativeText: z.string().nullable(),
    caption: z.string().nullable(),
    width: z.number(),
    height: z.number(),
    formats: z.object({
        thumbnail: ImageFormatSchema
    }).optional(),
    hash: z.string(),
    ext: z.string(),
    mime: z.string(),
    size: z.number(),
    url: z.string(),
    previewUrl: z.string().nullable(),
    provider: z.string(),
    provider_metadata: z.any().nullable(),
    folderPath: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    locale: z.string().nullable(),
}).optional().nullable();

export const ImageSchemaWithCustomAltAndDescription = z.object({
    __component: z.literal(UI.IMAGE).optional().nullable(),
    id: z.number().optional().nullable(),
    alt: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    image: ImageSchema,
});
