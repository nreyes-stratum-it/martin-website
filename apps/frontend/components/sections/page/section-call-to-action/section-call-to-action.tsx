import React from 'react'
import {SectionCallToActionData} from "@/lib/types/pages/sections/section-call-to-action/section-call-to-action";

import SectionCallToActionV1
    from "@/components/sections/page/section-call-to-action/variants/section-call-to-action-v1/section-call-to-action-v1";
import {VARIANTS} from "@/lib/enums/ variants";

type SectionCallToActionProps = {
    data: SectionCallToActionData
}
const SectionCallToAction = ({data}: SectionCallToActionProps) => {

    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case VARIANTS["VARIANT-1"]:
            return <SectionCallToActionV1 data={data}/>
        default:
            return null
    }
}
export default SectionCallToAction
