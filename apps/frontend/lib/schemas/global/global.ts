import {z} from "zod";
import {HeaderSchema} from "@/lib/schemas/global/header/header";

export const GlobalSchema = z.object({
    id: z.number(),
    locale: z.string(),
    header: HeaderSchema,
});
