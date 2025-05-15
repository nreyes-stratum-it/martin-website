import {z} from 'zod';
import {VariantEnumSchema} from "@/lib/enums/ variants";
import {PageSections} from "@/lib/const/components/sections/sections-key";
import {FeaturesSchema} from "@/lib/schemas/components/features/features";

export const SectionSpotlightsSchema = z.object({
    __component: z.literal(PageSections.SECTION_WITH_FEATURES),
    id: z.number(),
    variant: VariantEnumSchema,
    spotlights: FeaturesSchema.array().optional().nullable(),
})