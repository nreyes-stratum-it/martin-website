import {SitemapSchema} from "@/lib/schemas/routing/sitemap";
import {z} from "zod";

export type SitemapData = z.infer<typeof SitemapSchema>;