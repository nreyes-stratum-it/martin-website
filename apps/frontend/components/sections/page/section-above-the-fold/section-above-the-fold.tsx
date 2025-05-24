import React from 'react'
import {SectionAboveTheFoldData} from "@/lib/types/pages/sections/section-above-the-fold/section-above-the-fold";
import SectionAboveTheFoldV1
    from "@/components/sections/page/section-above-the-fold/variants/section-above-the-fold-v1/section-above-the-fold-v1";
import {VARIANTS} from "@/lib/enums/ variants";
import SectionAboveTheFoldV2
    from "@/components/sections/page/section-above-the-fold/variants/section-above-the-fold-v2/section-above-the-fold-v2";

type SectionAboveTheFoldProps = {
    data: SectionAboveTheFoldData
}
const SectionAboveTheFold = ({data}: SectionAboveTheFoldProps) => {

    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case VARIANTS["VARIANT-1"]:
            return <SectionAboveTheFoldV1 data={data}/>
        case VARIANTS["VARIANT-2"]:
            return <SectionAboveTheFoldV2 data={data}/>
        default:
            return null
    }
}
export default SectionAboveTheFold
