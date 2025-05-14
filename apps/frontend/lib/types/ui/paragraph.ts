import z from "zod";
import {ParagraphSchema} from "@/lib/schemas/ui/paragraph";

export type ParagraphData = z.infer<typeof ParagraphSchema>;