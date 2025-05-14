import {z} from "zod";
import {SectionAboveTheFoldSchema} from "@/lib/schemas/page/sections/section-above-the-fold/section-above-the-fold";

export const ContentSchema = z
    .array(
        z.discriminatedUnion("__component", [SectionAboveTheFoldSchema])
    )
    .optional()
    .default([]);
