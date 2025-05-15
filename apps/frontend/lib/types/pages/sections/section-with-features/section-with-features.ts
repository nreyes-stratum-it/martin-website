import {z} from "zod";
import {SectionWithFeaturesSchema} from "@/lib/schemas/page/sections/section-with-features/section-with-features";

export type SectionWithFeaturesData = z.infer<typeof SectionWithFeaturesSchema>;