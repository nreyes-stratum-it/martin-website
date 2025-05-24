import {SectionContactFormSchema} from "@/lib/schemas/page/sections/section-contact-form/section-contact-form";
import {z} from "zod";

export type SectionContactFormData = z.infer<typeof SectionContactFormSchema>;