import type {ComponentType} from "react";

import Headline from "@/components/ui/headline/headline";

import {ComponentsKeys, UI} from "@/lib/const/components/ui/components-key";

import Paragraph from "@/components/ui/paragraph/paragraph";
import {Image} from "@/components/ui/image/image";
import Subline from "@/components/ui/subline/subline";
import {PageSections, PageSectionsKeys} from "@/lib/const/components/sections/sections-key";
import SectionAboveTheFold from "@/components/sections/page/section-above-the-fold/section-above-the-fold";

import SectionWithFeatures from "@/components/sections/page/section-with-features/section-with-features";
import SectionSpotlights from "@/components/sections/page/section-spotlights/section-spotlights";
import SectionCallToAction from "@/components/sections/page/section-call-to-action/section-call-to-action";
import SectionContactForm from "@/components/sections/page/section-contact-form/section-contact-form";
import SectionStepper from "@/components/sections/page/section-stepper/section-stepper";
import SectionBusiness from "@/components/sections/page/section-business/section-business";

const dynamicMap: Record<ComponentsKeys | PageSectionsKeys, ComponentType<any>> = {
    /*Pages*/
    [PageSections.SECTION_ABOVE_THE_FOLD]: SectionAboveTheFold,
    [PageSections.SECTION_WITH_FEATURES]: SectionWithFeatures,
    [PageSections.SECTION_SPOTLIGHTS]: SectionSpotlights,
    [PageSections.SECTION_CALL_TO_ACTION]: SectionCallToAction,
    [PageSections.SECTION_CONTACT_FORM]: SectionContactForm,
    [PageSections.SECTION_STEPPER]: SectionStepper,
    [PageSections.SECTION_BUSINESS_CARD]: SectionBusiness,

    /*Components*/
    [UI.SUBLINE]: Subline,
    [UI.HEADLINE]: Headline,
    [UI.PARAGRAPH]: Paragraph,
    [UI.IMAGE]: Image,
};

export default dynamicMap;
