import {z} from "zod";
import {LogoSchema} from "@/lib/schemas/ui/logo";
import {MenuLinkSchema} from "@/lib/schemas/global/header/navigation/menu-link";


export const HeaderSchema = z.object({
    id: z.number(),
    logo: LogoSchema,
    menu_link: z.array(MenuLinkSchema),
});

