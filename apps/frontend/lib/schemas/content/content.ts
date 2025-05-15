import {z} from "zod";
import {SectionAboveTheFoldSchema} from "@/lib/schemas/page/sections/section-above-the-fold/section-above-the-fold";
import {SectionWithFeaturesSchema} from "@/lib/schemas/page/sections/section-with-features/section-with-features";
import {SectionCallToActionSchema} from "@/lib/schemas/page/sections/section-call-to-action/section-call-to-action";
import {SectionSpotlightsSchema} from "@/lib/schemas/page/sections/section-spotlights/section-spotlights";

export const ContentSchema = z
    .array(
        z.union([
            SectionAboveTheFoldSchema.optional().nullable(),
            SectionWithFeaturesSchema.optional().nullable(),

            SectionSpotlightsSchema.optional().nullable(),
            SectionCallToActionSchema.optional().nullable(),
            z.unknown(),
        ])
    )
    .optional()
    .nullable();
