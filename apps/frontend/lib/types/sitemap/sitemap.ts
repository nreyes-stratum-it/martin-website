import {PagePathSchema, PagePathsSchema} from "@/lib/schemas/sitemap/sitemap";
import z from "zod";

export type PagePathsData = z.infer<typeof PagePathsSchema>;
export type PagePathData = z.infer<typeof PagePathSchema>;