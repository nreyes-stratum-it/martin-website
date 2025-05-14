import {normalizeSlug} from "@/lib/utils/normalize-slug";
import {FRONTEND_URL} from "@/lib/config/env";

const FRONTEND_BASE = FRONTEND_URL.replace(/\/$/, '');

export const toFrontendUrl = (path: string): string =>
    path.startsWith('http') ? path : `${FRONTEND_BASE}${normalizeSlug(path)}`;
