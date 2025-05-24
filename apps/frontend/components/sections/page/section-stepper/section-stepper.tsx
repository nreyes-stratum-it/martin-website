import React from 'react'
import {SectionStepperData} from "@/lib/types/pages/sections/section-stepper/section-stepper";
import SectionStepperV1
    from "@/components/sections/page/section-stepper/variants/section-stepper-v1/section-stepper-v1";
import {VARIANTS} from "@/lib/enums/ variants";


type SectionStepperProps = {
    data: SectionStepperData
}
const SectionStepper = ({data}: SectionStepperProps) => {
    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case VARIANTS["VARIANT-1"]:
            return <SectionStepperV1 data={data}></SectionStepperV1>
        default:
            return null
    }
}
export default SectionStepper
