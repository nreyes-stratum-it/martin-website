export const UI = {
    HEADLINE: "ui.headline",
    SUBLINE: "ui.subline",
    PARAGRAPH: "ui.paragraph",
    IMAGE: "ui.image",

} as const;

export type ComponentsKeys = (typeof UI)[keyof typeof UI];
