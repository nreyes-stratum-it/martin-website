import {FormSchema} from "@/lib/schemas/form/form";
import {z} from "zod";

export type FormData = z.infer<typeof FormSchema>;