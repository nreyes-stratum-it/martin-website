import React from 'react'
import {SectionCallToActionData} from "@/lib/types/pages/sections/section-call-to-action/section-call-to-action";
import HeadLine from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";
import Link from "@/components/ui/link/link";
import {getMediaUrl} from "@/lib/helpers/media/media";

type SectionCallToActionV1Props = {
    data: SectionCallToActionData
}
const SectionCallToActionV1 = ({data}: SectionCallToActionV1Props) => {
    if (!data) {
        return null
    }
    const {headline, subline, callToAction, background} = data

    const bgImageUrl = getMediaUrl(background?.image?.url);

    return (
        <section
            className="bg-cover bg-fixed bg-center bg-no-repeat wrapper style4"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImageUrl})`,
            }}
            id="cta">
            <div className="inner">
                <header>
                    <HeadLine data={headline}></HeadLine>
                    <Subline data={subline}></Subline>
                </header>
                <ul className="actions stacked">
                    {callToAction?.slice(0, 1).map((cta, index) => (
                        <li key={index}>
                            <Link
                                data={cta}
                                className="button fit primary"
                            />
                        </li>
                    ))}
                    {callToAction?.slice(1).map((cta, index) => (
                        <li key={index}>
                            <Link
                                data={cta}
                                className="button fit"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default SectionCallToActionV1
