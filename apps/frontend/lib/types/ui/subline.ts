import z from "zod";
import {SublineSchema} from "@/lib/schemas/ui/subline";

export type SublineData = z.infer<typeof SublineSchema>;