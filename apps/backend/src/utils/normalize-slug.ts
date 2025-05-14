export function normalizeSlug(slug?: string | null): string {
    if (!slug) return '/';

    const cleaned = slug.trim();

    const mid = cleaned
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/{2,}/g, '/');

    return mid ? `/${mid}` : '/';
}
