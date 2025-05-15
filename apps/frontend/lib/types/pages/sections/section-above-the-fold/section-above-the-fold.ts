import {SectionAboveTheFoldSchema} from "@/lib/schemas/page/sections/section-above-the-fold/section-above-the-fold";
import {z} from "zod";

export type SectionAboveTheFoldData = z.infer<typeof SectionAboveTheFoldSchema>;