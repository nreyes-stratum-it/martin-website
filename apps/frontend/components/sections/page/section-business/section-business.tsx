import React from 'react'
import {SectionBusinessData} from "@/lib/types/pages/sections/section-business/section-business";
import {VARIANTS} from "@/lib/enums/ variants";
import SectionBusinessV1
    from "@/components/sections/page/section-business/variants/section-business-v1/section-business-v1";

type SectionBusinessProps = {
    data: SectionBusinessData
}
const SectionBusiness = ({data}: SectionBusinessProps) => {

    if (!data) {
        return null
    }

    switch (data.variant) {
        case VARIANTS["VARIANT-1"]:
            return (
                <SectionBusinessV1 data={data}></SectionBusinessV1>
            )
        default:
            return null
    }


}
export default SectionBusiness
