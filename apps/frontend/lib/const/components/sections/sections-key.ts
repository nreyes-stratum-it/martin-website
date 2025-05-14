export const PageSections = {
    SECTION_ABOVE_THE_FOLD: "page.section-above-the-fold",
} as const;

export type PageSectionsKeys = (typeof PageSections)[keyof typeof PageSections];