import {z} from 'zod';
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {SublineSchema} from "@/lib/schemas/ui/subline";
import {PageSections} from "@/lib/const/components/sections/sections-key";
import {FormSchema} from "@/lib/schemas/form/form";
import {VariantEnumSchema} from "@/lib/enums/ variants";

export const SectionContactFormSchema = z.object({
    __component: z.literal(PageSections.SECTION_CONTACT_FORM),
    headline: HeadlineSchema,
    subline: SublineSchema.optional().nullable(),
    form: FormSchema,
    variant: VariantEnumSchema
})