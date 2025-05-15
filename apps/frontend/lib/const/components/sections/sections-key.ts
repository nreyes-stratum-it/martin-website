export const PageSections = {
    SECTION_ABOVE_THE_FOLD: "page.section-above-the-fold",
    SECTION_WITH_FEATURES: "page.section-with-features",
    SECTION_SPOTLIGHTS: "page.section-spotlights",
    SECTION_CALL_TO_ACTION: "page.section-call-to-action",

} as const;

export type PageSectionsKeys = (typeof PageSections)[keyof typeof PageSections];