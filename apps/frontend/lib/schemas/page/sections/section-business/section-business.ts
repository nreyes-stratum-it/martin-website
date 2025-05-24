import {z} from 'zod';
import {TeamSchema} from "@/lib/schemas/team/team";
import {VariantEnumSchema} from "@/lib/enums/ variants";
import {PageSections} from "@/lib/const/components/sections/sections-key";
import {ImageSchemaWithCustomAltAndDescription} from "@/lib/schemas/ui/image";

export const SectionBusinessSchema = z.object({
    __component: z.literal(PageSections.SECTION_STEPPER),
    person: TeamSchema.optional().nullable(),
    variant: VariantEnumSchema,
    background: ImageSchemaWithCustomAltAndDescription.optional().nullable()
})