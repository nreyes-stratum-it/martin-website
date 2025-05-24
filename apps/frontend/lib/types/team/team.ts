import {TeamSchema} from "@/lib/schemas/team/team";
import {z} from "zod";

export type TeamData = z.infer<typeof TeamSchema>;