import {z} from 'zod';
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {SublineSchema} from "@/lib/schemas/ui/subline";
import {ImageSchemaWithCustomAltAndDescription} from "@/lib/schemas/ui/image";

export const FeaturesSchema = z.object({
    id: z.number(),
    headline: HeadlineSchema,
    subline: SublineSchema.optional().nullable(),
    media: ImageSchemaWithCustomAltAndDescription.optional().nullable(),
})