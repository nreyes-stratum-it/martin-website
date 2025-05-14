import {MenuLinkSchema} from "@/lib/schemas/global/header/navigation/menu-link";
import {z} from "zod";

export type MenuLinkData = z.infer<typeof MenuLinkSchema>;