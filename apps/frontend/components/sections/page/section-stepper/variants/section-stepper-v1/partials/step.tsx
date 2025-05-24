import React from 'react'
import Headline from "@/components/ui/headline/headline";
import Paragraph from "@/components/ui/paragraph/paragraph";
import {StepData} from "@/lib/types/pages/sections/section-stepper/step";

type StepProps = {
    data: StepData
    number: number
    isLast: boolean
}
const Step = ({data, number, isLast}: StepProps) => {

    if (!data) {
        return null
    }

    const {headline, paragraph, id} = data

    return (
        <div
            key={id}
            className={`!relative sm:!w-2/3 !w-full lg:!w-full !flex !items-start  ${!isLast && "min-h-32 lg:min-h-32"} !gap-6 !mb-3 last:!mb-0`}
        >

            <div className="!relative !w-16 !flex !flex-col !items-center !self-stretch">
                <span
                    className=" !w-12 md:!w-14 lg:!w-16 !aspect-square !rounded-full !bg-[#FAFAFF] !flex !items-center !justify-center !text-[#1E1E2F] !font-semibold">
                    {number}
                </span>

                {!isLast && (
                    <span
                        className="!flex-grow rounded-[2px] !mt-3 !w-[6px] md:!w-[8px] !bg-[#FAFAFF]/30"/>
                )}
            </div>
            <div className="min-w-0 !leading-tight w-full">
                <Headline
                    data={headline}
                    classNames="text-base lg:!text-[17px] !font-bold !m-0 break-all"
                />
                <Paragraph
                    data={paragraph}
                    classNames="text-base lg:!text-[14px] !text-gray-400 !m-0 break-words"
                />
            </div>
        </div>
    )
}
export default Step
