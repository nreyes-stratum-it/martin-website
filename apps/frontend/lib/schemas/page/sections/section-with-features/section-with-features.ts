import {z} from 'zod';
import {VariantEnumSchema} from "@/lib/enums/ variants";
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {SublineSchema} from "@/lib/schemas/ui/subline";
import {PageSections} from "@/lib/const/components/sections/sections-key";
import {FeaturesSchema} from "@/lib/schemas/components/features/features";

export const SectionWithFeaturesSchema = z.object({
    __component: z.literal(PageSections.SECTION_WITH_FEATURES),
    id: z.number(),
    variant: VariantEnumSchema,
    headline: HeadlineSchema,
    subline: SublineSchema.optional().nullable(),
    features: FeaturesSchema.array().optional().nullable(),
})