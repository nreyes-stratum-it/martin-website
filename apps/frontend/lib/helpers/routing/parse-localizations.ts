import {LocalizationData} from "@/lib/types/localizations/localization";
import {LocalizationSchema} from "@/lib/schemas/localizations/localization";


export function parseLocalizations(input: unknown[]): LocalizationData[] {
    return input.flatMap((loc) => {
        const parsed = LocalizationSchema.safeParse(loc);
        if (!parsed.success) {
            console.error("Failed to parse localization:", parsed.error);
            return [];
        }
        return parsed.data;
    });
}
