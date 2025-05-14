import {z} from "zod";

export const StaticParamsSchema = z.array(
    z.object({
        slug: z.array(z.string()),
    })
);
