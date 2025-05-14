import {PagesSchema} from "@/lib/schemas/page/page";
import z from "zod";

export type PagesData = z.infer<typeof PagesSchema>;
