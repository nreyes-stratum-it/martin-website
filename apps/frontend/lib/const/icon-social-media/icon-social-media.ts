
export const getSocialIconName = (label: string) => {
    const lower = label.toLowerCase();

    if (lower.includes("facebook")) return "mdi:facebook";
    if (lower.includes("instagram")) return "mdi:instagram";
    if (lower.includes("twitter")) return "mdi:twitter";
    if (lower.includes("linkedin")) return "mdi:linkedin";
    if (lower.includes("youtube")) return "mdi:youtube";
    if (lower.includes("tiktok")) return "ic:baseline-tiktok";
    if (lower.includes("email")) return "mdi:email";
    if (lower.includes("x")) return "mdi:twitter";
    return "mdi:link";
};
