import z from "zod";

export const FormFieldSchema = z.object({
    label: z.string(),
    type: z.enum(["text", "email", "tel", "textarea","select"]),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
    options: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).optional(),
})