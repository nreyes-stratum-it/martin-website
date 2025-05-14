import z from "zod";
import {UI} from "@/lib/const/components/ui/components-key";

export const HeadlineSchema = z.object({
    __component: z.literal(UI.HEADLINE).optional().nullable(),
    id: z.number().optional(),
    text: z.string().optional().nullable(),
    tag: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional(),
})