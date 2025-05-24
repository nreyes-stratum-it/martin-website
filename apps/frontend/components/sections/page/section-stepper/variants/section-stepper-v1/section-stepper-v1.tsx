"use client";

import React from "react";
import {SectionStepperData} from "@/lib/types/pages/sections/section-stepper/section-stepper";
import Headline from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";
import dynamic from "next/dynamic";

const Step = dynamic(() => import("./partials/step"), {ssr: false});


type SectionStepperV1Props = {
    data: SectionStepperData;
};

const SectionStepperV1 = ({data}: SectionStepperV1Props) => {
    if (!data) return null;

    const {steps, headline, subline} = data;

    return (
        <section id="steps" className="!text-[#FAFAFF] !flex !justify-center">
            <div
                className="!w-[90%] lg:!max-w-7xl !mx-auto !py-40  !flex !flex-col lg:!flex-row !items-center gap-y-10 lg:!gap-x-40">

                <div className="!w-full lg:!w-1/2 !flex !flex-col !items-center lg:!items-start !gap-8">
                    <Headline
                        classNames="!prose dark:!prose-invert !my-0 !text-white !text-xl md:!text-2xl lg:!text-3xl !font-bold !uppercase"
                        data={headline}
                    />
                    <Subline
                        classNames="!prose !my-0 dark:!prose-invert !text-gray-300  !font-mono !font-thin !max-w-3xl  !text-lg md:!text-md lg:!text-lg"
                        data={subline}
                    />
                </div>

                <div className="!w-full !py-14 !flex-col !flex sm:items-center  lg:!items-start lg:!w-1/2">

                    {steps?.map((step, index) => {
                        const isLast = index === steps.length - 1;
                        const number = index + 1;

                        return (
                            <Step
                                isLast={isLast}
                                number={number}
                                data={step}
                                key={step.id}
                            ></Step>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SectionStepperV1;