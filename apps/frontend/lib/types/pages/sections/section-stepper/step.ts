import {StepSchema} from "@/lib/schemas/page/sections/section-stepper/section-stepper";
import {z} from "zod";

export type StepData = z.infer<typeof StepSchema>;