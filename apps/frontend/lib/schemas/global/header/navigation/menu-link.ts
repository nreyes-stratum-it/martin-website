import {z} from "zod";
import {LinkSchema} from "@/lib/schemas/ui/link";
import {SubmenuLinkSchema} from "@/lib/schemas/global/header/navigation/submenu-link";

export const MenuLinkSchema = z.object({
    id: z.number(),
    link: LinkSchema,
    submenu_link: SubmenuLinkSchema.optional().nullable(),
});