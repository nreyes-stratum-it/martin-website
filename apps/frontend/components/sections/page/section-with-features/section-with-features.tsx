import React from 'react'
import {SectionWithFeaturesData} from "@/lib/types/pages/sections/section-with-features/section-with-features";
import SectionWithFeaturesV1
    from "@/components/sections/page/section-with-features/variants/section-with-features-v1/section-with-features-v1";
import SectionWithFeaturesV2
    from "@/components/sections/page/section-with-features/variants/section-with-features-v2/section-with-features-v2";
import {VARIANTS} from "@/lib/enums/ variants";
import SectionWithFeaturesV3
    from "@/components/sections/page/section-with-features/variants/section-with-features-v3/section-with-features-v3";

type SectionWithFeaturesProps = {
    data: SectionWithFeaturesData
}
const SectionWithFeatures = ({data}: SectionWithFeaturesProps) => {
    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case VARIANTS["VARIANT-1"]:
            return <SectionWithFeaturesV1 data={data}/>
        case VARIANTS["VARIANT-2"]:
            return <SectionWithFeaturesV2 data={data}/>
        case VARIANTS["VARIANT-3"]:
            return <SectionWithFeaturesV3 data={data}/>
        default:
            return null
    }
}
export default SectionWithFeatures
