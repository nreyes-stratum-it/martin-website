import z from "zod";
import {ImageSchema, ImageSchemaWithCustomAltAndDescription} from "@/lib/schemas/ui/image";

export type ImageData = z.infer<typeof ImageSchema>;

export type ImageDataWithCustomAltAndDescription = z.infer<typeof ImageSchemaWithCustomAltAndDescription>;