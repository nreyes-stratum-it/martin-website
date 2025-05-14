import {LinkSchema} from "@/lib/schemas/ui/link";
import {z} from "zod";

export type LinkData = z.infer<typeof LinkSchema>;