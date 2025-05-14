import {z} from "zod";
import {LinkSchema} from "@/lib/schemas/ui/link";

export const SubmenuLinkSchema = z.object({
    id: z.number(),
    link: z.array(LinkSchema),
});
