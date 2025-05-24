import z from "zod";
import {HeadlineSchema} from "@/lib/schemas/ui/headline";
import {FormFieldSchema} from "@/lib/schemas/form/form-field";

export const FormSchema = z.object({
    title: HeadlineSchema.optional().nullable(),
    formFields: z.array(FormFieldSchema),
});