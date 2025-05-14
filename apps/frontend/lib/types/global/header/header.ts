import {HeaderSchema} from "@/lib/schemas/global/header/header";
import {z} from "zod";

export type HeaderData = z.infer<typeof HeaderSchema>;