import {SectionStepperSchema} from "@/lib/schemas/page/sections/section-stepper/section-stepper";
import {z} from "zod";

export type SectionStepperData = z.infer<typeof SectionStepperSchema>;