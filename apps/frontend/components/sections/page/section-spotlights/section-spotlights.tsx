import React from 'react'
import {SectionSpotlightsData} from "@/lib/types/pages/sections/section-spotlights/section-spotlights";
import SectionAboveTheFoldV1
    from "@/components/sections/page/section-above-the-fold/variants/section-above-the-fold-v1/section-above-the-fold-v1";
import SectionSpotlightV1
    from "@/components/sections/page/section-spotlights/variants/section-spotlights-v1/section-spotlight-v1";

type SectionSpotlightsProps = {
    data: SectionSpotlightsData
}
const SectionSpotlights = ({data}: SectionSpotlightsProps) => {

    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case "VARIANT-1":
            return <SectionSpotlightV1 data={data}/>
        default:
            return null
    }
}
export default SectionSpotlights
