
export function isSingleBlog(slug: string[]): boolean {
    return slug.length > 1 && slug[0] === "blogs";
}

export function isSingleCertification(slug: string[]): boolean {
    return slug.length > 1 && slug[0] === "certifications";
}
