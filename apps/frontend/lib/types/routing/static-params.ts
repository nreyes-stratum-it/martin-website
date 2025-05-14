import {StaticParamsSchema} from "@/lib/schemas/routing/static-params";
import {z} from "zod";

export type StaticParams = z.infer<typeof StaticParamsSchema>;
