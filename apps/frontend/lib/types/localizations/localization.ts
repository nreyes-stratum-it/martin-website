import {LocalizationSchema} from "@/lib/schemas/localizations/localization";
import {z} from "zod";

export type LocalizationData = z.infer<typeof LocalizationSchema>;