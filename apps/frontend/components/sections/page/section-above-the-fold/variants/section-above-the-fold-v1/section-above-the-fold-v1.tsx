"use client"

import React from 'react'
import {SectionAboveTheFoldData} from "@/lib/types/pages/sections/section-above-the-fold/section-above-the-fold";
import HeadLine from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";
import Link from "@/components/ui/link/link";
import {getMediaUrl} from "@/lib/helpers/media/media";

type SectionAboveDefaultV1Props = {
    data: SectionAboveTheFoldData
}
const SectionAboveTheFoldV1 = ({data}: SectionAboveDefaultV1Props) => {

    if (!data) {
        return null
    }

    const {background, callToAction, headline, subline} = data

    const bgImageUrl = getMediaUrl(background?.image?.url);


    return (
        <section
            className="bg-cover bg-fixed bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImageUrl})`,
            }}
            id="banner">
            <div className="inner">
                <HeadLine data={headline}></HeadLine>

                <Subline data={subline}></Subline>
                <ul className="actions special">
                    <li>
                        {
                            callToAction && callToAction?.slice(0, 1).map(((item, index) => {
                                    return (<Link
                                        className={"button primary"}
                                        key={index} data={item}></Link>)
                                })
                            )
                        }
                    </li>
                </ul>
            </div>
            {
                callToAction && callToAction?.slice(1).map(((item, index) => {
                        return (<Link
                            className={"more scrolly"}
                            key={index} data={item}></Link>)
                    })
                )
            }
        </section>
    )
}
export default SectionAboveTheFoldV1
