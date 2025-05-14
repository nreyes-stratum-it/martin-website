
export function toPath(slug: string | string[]): string {
    const raw = Array.isArray(slug) ? slug.join('/') : slug;

    const cleaned =
        '/' + raw.replace(/^\/+|\/+$/g, '').replace(/\/{2,}/g, '/');
    return cleaned === '/' ? '/' : cleaned.replace(/\/$/, '');
}
