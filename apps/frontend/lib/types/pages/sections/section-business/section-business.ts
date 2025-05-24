import {SectionBusinessSchema} from "@/lib/schemas/page/sections/section-business/section-business";
import {z} from "zod";

export type SectionBusinessData = z.infer<typeof SectionBusinessSchema>;