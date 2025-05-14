import {GlobalSchema} from "@/lib/schemas/global/global";
import {z} from "zod";

export type GlobalData = z.infer<typeof GlobalSchema>;