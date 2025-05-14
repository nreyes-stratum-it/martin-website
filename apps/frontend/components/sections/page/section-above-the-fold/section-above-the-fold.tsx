import React from 'react'
import {SectionAboveTheFoldData} from "@/lib/types/pages/sections/section above the fold/section-above-the-fold";
import SectionAboveTheFoldV1
    from "@/components/sections/page/section-above-the-fold/variants/section-above-the-fold-v1/section-above-the-fold-v1";

type SectionAboveTheFoldProps = {
    data: SectionAboveTheFoldData
}
const SectionAboveTheFold = ({data}: SectionAboveTheFoldProps) => {

    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case "VARIANT-1":
            return <SectionAboveTheFoldV1 data={data}/>
        default:
            return null
    }
}
export default SectionAboveTheFold
