import {SectionCallToActionSchema} from "@/lib/schemas/page/sections/section-call-to-action/section-call-to-action";
import {z} from "zod";

export type SectionCallToActionData = z.infer<typeof SectionCallToActionSchema>;