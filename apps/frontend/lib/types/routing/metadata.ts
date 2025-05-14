import {MetadataSchema} from "@/lib/schemas/routing/metadata";
import {z} from "zod";

export type Metadata = z.infer<typeof MetadataSchema>;