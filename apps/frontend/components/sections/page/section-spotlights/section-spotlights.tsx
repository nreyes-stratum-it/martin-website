import React from 'react'
import {SectionSpotlightsData} from "@/lib/types/pages/sections/section-spotlights/section-spotlights";
import SectionSpotlightV1
    from "@/components/sections/page/section-spotlights/variants/section-spotlights-v1/section-spotlight-v1";
import {VARIANTS} from "@/lib/enums/ variants";

type SectionSpotlightsProps = {
    data: SectionSpotlightsData
}
const SectionSpotlights = ({data}: SectionSpotlightsProps) => {

    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case VARIANTS["VARIANT-1"]:
            return <SectionSpotlightV1 data={data}/>
        default:
            return null
    }
}
export default SectionSpotlights
