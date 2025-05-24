"use client"

import React from 'react'
import {SectionAboveTheFoldData} from "@/lib/types/pages/sections/section-above-the-fold/section-above-the-fold";
import {getMediaUrl} from "@/lib/helpers/media/media";
import Headline from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";
import Link from "@/components/ui/link/link";

type SectionAboveDefaultV1Props = {
    data: SectionAboveTheFoldData
}
const SectionAboveTheFoldV2 = ({data}: SectionAboveDefaultV1Props) => {

    if (!data) {
        return null
    }

    const {background, callToAction, headline, subline} = data

    const bgImageUrl = getMediaUrl(background?.image?.url);

    const mainButton = callToAction?.slice(0, 1)[0]
    const secondaryButton = callToAction?.slice(1, 2)[0]

    return (
        <div className="!bg-[#232b33] h-screen">
            <div className="!relative h-full">
                <div className="!mx-auto lg:!max-w-7xl !w-[95%]  ">
                    <div className="!relative !z-10 !pt-14 lg:!w-full lg:!max-w-2xl">
                        <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="!absolute !inset-y-0 !right-8 !hidden !h-full !w-80 !translate-x-1/2 !transform !fill-[#232b33] lg:!block"
                        >
                            <polygon

                                points="0,0 90,0 50,100 0,100"/>
                        </svg>

                        <div className="!relative  !py-24 sm:!py-40  lg:!py-56 lg:!pr-0">
                            <div className="!mx-auto !max-w-2xl lg:!mx-0 lg:!max-w-xl">

                                <Headline
                                    data={headline}
                                    classNames={"!text-pretty !text-center md:!text-left !text-wrap md:!text-balance !text-gray-100 !my-0 !text-3xl md:!text-5xl !font-semibold !tracking-tight  sm:!text-6xl"}
                                ></Headline>
                                <Subline
                                    data={subline}
                                    classNames={"!my-0 !mt-8 !text-gray-300 !text-pretty !text-lg !font-medium  sm:!text-xl/8"}
                                ></Subline>

                                <div className="!mt-10 !flex flex-col gap-y-5  !items-center !gap-x-6 ">


                                    {mainButton && (
                                        <Link
                                            data={mainButton}
                                            className="button !w-full !max-w-full "
                                        >
                                        </Link>
                                    )}


                                    {
                                        secondaryButton && (
                                            <Link
                                                data={secondaryButton}
                                                className="button primary !w-full !max-w-full"
                                            >
                                            </Link>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative lg:!absolute lg:!inset-y-0 lg:!right-0 lg:!w-1/2">

                    <img
                        alt={background?.alt || ""}
                        src={`${bgImageUrl}`}
                        className="!aspect-[3/2] !object-cover lg:!aspect-auto lg:!size-full"
                    />
                    <div
                        className={`!absolute bg-black/70 !inset-0 !h-full !w-full !object-cover !opacity-50`}
                    ></div>

                </div>
            </div>
        </div>
    )
}
export default SectionAboveTheFoldV2