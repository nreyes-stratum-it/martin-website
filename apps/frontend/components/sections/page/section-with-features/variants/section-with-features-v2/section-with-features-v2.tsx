import React from 'react'
import {SectionWithFeaturesData} from "@/lib/types/pages/sections/section-with-features/section-with-features";
import HeadLine from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";
import {Image} from "@/components/ui/image/image";

type SectionWithFeaturesV2Props = {
    data: SectionWithFeaturesData
}
const SectionWithFeaturesV2 = ({data}: SectionWithFeaturesV2Props) => {

    if (!data) {
        return null
    }
    const {headline, subline, features} = data

    return (
        <section id="three" className="wrapper style3 special">
            <div className="inner">
                <header className="major">
                    <HeadLine data={headline}></HeadLine>
                    <Subline data={subline}></Subline>
                </header>
                <ul className="features">
                    {features?.map((feature) => (
                        <li key={feature.id} className="text-center lg:!px-10 lg:!py-10  lg:!flex lg:!justify-start lg:!items-start">
                            {feature.media?.image && (
                                <div className="!mb-4 flex justify-center lg:!mr-4 ">
                                    <Image
                                        data={{
                                            image: feature.media.image,
                                            alt: feature.media.alt || feature.headline?.text,
                                        }}
                                        className="h-full w-72 object-contain"
                                    />
                                </div>
                            )}

                            <div>
                                <HeadLine data={feature.headline}/>
                                <Subline data={feature.subline}/>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    )
}
export default SectionWithFeaturesV2
