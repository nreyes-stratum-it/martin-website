import z from "zod";
import {HeadlineSchema} from "@/lib/schemas/ui/headline";

export type HeadlineData = z.infer<typeof HeadlineSchema>;