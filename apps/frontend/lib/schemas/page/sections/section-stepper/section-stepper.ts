import {z} from "zod"
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {SublineSchema} from "@/lib/schemas/ui/subline";
import {PageSections} from "@/lib/const/components/sections/sections-key";
import {ParagraphSchema} from "@/lib/schemas/ui/paragraph";
import {VariantEnumSchema} from "@/lib/enums/ variants";

export const StepSchema = z.object({
    id: z.string().optional(),
    headline: HeadlineSchema,
    paragraph: ParagraphSchema.optional()
})

export const SectionStepperSchema = z.object({
    __component: z.literal(PageSections.SECTION_STEPPER),
    id: z.string().optional(),
    headline: HeadlineSchema,
    subline: SublineSchema.optional().nullable(),
    steps: z.array(StepSchema).optional().nullable(),
    variant: VariantEnumSchema,


})