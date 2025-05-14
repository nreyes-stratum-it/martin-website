import {z} from "zod";

export const LinkSchema = z.object({
    id: z.number(),
    label: z.string(),
    url: z.string(),
    isExternal: z.boolean(),
    ariaLabel: z.string().nullable(),
});