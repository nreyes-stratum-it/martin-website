import {z} from 'zod';
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {SublineSchema} from "@/lib/schemas/ui/subline";
import {ImageSchemaWithCustomAltAndDescription} from "@/lib/schemas/ui/image";
import {LinkSchema} from "@/lib/schemas/ui/link";
import {PageSections} from "@/lib/const/components/sections/sections-key";
import {VariantEnumSchema} from "@/lib/enums/ variants";

export const SectionAboveTheFoldSchema = z.object({
    __component: z.literal(PageSections.SECTION_ABOVE_THE_FOLD),
    id: z.number(),
    variant: VariantEnumSchema,
    headline: HeadlineSchema,
    subline: SublineSchema.optional().nullable(),
    callToAction: z.array(LinkSchema).optional().nullable(),
    background: ImageSchemaWithCustomAltAndDescription.optional().nullable(),
});