import {SectionSpotlightsSchema} from "@/lib/schemas/page/sections/section-spotlights/section-spotlights";
import {z} from "zod";

export type SectionSpotlightsData = z.infer<typeof SectionSpotlightsSchema>;