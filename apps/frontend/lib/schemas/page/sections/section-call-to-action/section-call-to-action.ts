import {z} from 'zod';
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {SublineSchema} from "@/lib/schemas/ui/subline";
import {LinkSchema} from "@/lib/schemas/ui/link";
import {VariantEnumSchema} from "@/lib/enums/ variants";
import {ImageSchemaWithCustomAltAndDescription} from "@/lib/schemas/ui/image";
import {PageSections} from "@/lib/const/components/sections/sections-key";

export const SectionCallToActionSchema = z.object({
    __component: z.literal(PageSections.SECTION_CALL_TO_ACTION),
    headline: HeadlineSchema,
    subline: SublineSchema.optional().nullable(),
    callToAction: LinkSchema.array().optional().nullable(),
    variant: VariantEnumSchema,
    background: ImageSchemaWithCustomAltAndDescription.optional().nullable(),
})