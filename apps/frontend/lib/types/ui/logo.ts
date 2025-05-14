import {LogoSchema} from "@/lib/schemas/ui/logo";
import {z} from "zod";

export type LogoData = z.infer<typeof LogoSchema>;