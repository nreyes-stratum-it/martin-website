import z from 'zod';
import {ImageSchema} from "@/lib/schemas/ui/image";
import {LinkSchema} from "@/lib/schemas/ui/link";

export const TeamSchema = z.object({
    id: z.string(),
    name: z.string(),
    position: z.string(),
    phone: z.string(),
    avatar: ImageSchema,
    social_links: z.array(LinkSchema).optional().nullable(),
    recommended_links: z.array(LinkSchema).optional().nullable(),
    biography: z.string().optional().nullable(),
});