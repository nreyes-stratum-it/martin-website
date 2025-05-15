export function getMediaUrl(path?: string | null): string {
    if (!path) return "";

    if (/^(https?:)?\/\//.test(path)) {
        return path;
    }

    const baseUrl =
        (process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_MEDIA_BASE_URL_PROD
            : process.env.NEXT_PUBLIC_MEDIA_BASE_URL_DEV) || "http://localhost:1338";

    if (!baseUrl) {
        throw new Error("Base URL for media is not defined in environment variables");
    }

    return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
