import {z} from "zod";
import {ImageSchemaWithCustomAltAndDescription} from "@/lib/schemas/ui/image";

export const LogoSchema = z.object({
    id: z.number(),
    text: z.string(),
    media: ImageSchemaWithCustomAltAndDescription.optional().nullable(),
});