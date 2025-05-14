import z from "zod";
import {UI} from "@/lib/const/components/ui/components-key";

export const SublineSchema = z.object({
    __component: z.literal(UI.SUBLINE).optional().nullable(),
    id: z.number().optional().nullable(),
    text: z.string().optional().nullable(),
    tag: z.enum(["p", "span", "div"]).optional().nullable(),
})