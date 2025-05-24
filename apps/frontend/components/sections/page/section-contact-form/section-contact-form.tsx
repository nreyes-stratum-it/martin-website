import React from 'react'
import {SectionContactFormData} from "@/lib/types/pages/sections/section-contact-form/section-contact-form";
import SectionContactFormV1
    from "@/components/sections/page/section-contact-form/variants/section-contact-form-v1/section-contact-form-v1";
import {VARIANTS} from "@/lib/enums/ variants";

type SectionContactFormProps = {
    data: SectionContactFormData
}
const SectionContactForm = ({data}: SectionContactFormProps) => {
    if (!data) {
        return null
    }

    const {variant} = data

    switch (variant) {
        case VARIANTS["VARIANT-1"]:
            return <SectionContactFormV1 data={data}/>
        default:
            return null
    }
}
export default SectionContactForm
