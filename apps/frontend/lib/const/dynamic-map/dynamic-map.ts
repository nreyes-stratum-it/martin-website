import type {ComponentType} from "react";

import Headline from "@/components/ui/headline/headline";

import {ComponentsKeys, UI} from "@/lib/const/components/ui/components-key";

import Paragraph from "@/components/ui/paragraph/paragraph";
import {Image} from "@/components/ui/image/image";
import Subline from "@/components/ui/subline/subline";
import {PageSections, PageSectionsKeys} from "@/lib/const/components/sections/sections-key";
import SectionAboveTheFold from "@/components/sections/page/section-above-the-fold/section-above-the-fold";

const dynamicMap: Record<ComponentsKeys | PageSectionsKeys, ComponentType<any>> = {
    /*Pages*/
    [PageSections.SECTION_ABOVE_THE_FOLD]: SectionAboveTheFold,

    /*Components*/
    [UI.SUBLINE]: Subline,
    [UI.HEADLINE]: Headline,
    [UI.PARAGRAPH]: Paragraph,
    [UI.IMAGE]: Image,
};

export default dynamicMap;
