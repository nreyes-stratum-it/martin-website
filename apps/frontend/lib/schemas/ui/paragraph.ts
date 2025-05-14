import z from "zod";
import {UI} from "@/lib/const/components/ui/components-key";

export const ParagraphSchema = z.object({
    __component: z.literal(UI.PARAGRAPH),
    id: z.number().optional().optional().nullable(),
    text: z.string().optional().nullable(),
    tag: z.enum(["p", "span", "div"]).optional().nullable(),
});
