import {z} from "zod";

export const VARIANT_VALUES = ["VARIANT-1", "VARIANT-2", "VARIANT-3"] as const;

export const VariantEnumSchema = z.enum(VARIANT_VALUES);

export const VARIANTS = Object.fromEntries(
    VARIANT_VALUES.map((v) => [v, v])
) as Record<typeof VARIANT_VALUES[number], typeof VARIANT_VALUES[number]>;

