import React from 'react'
import Headline from "@/components/ui/headline/headline";
import {SectionWithFeaturesData} from "@/lib/types/pages/sections/section-with-features/section-with-features";
import Subline from "@/components/ui/subline/subline";
import {Image} from "@/components/ui/image/image";

type SectionWithFeaturesV1Props = {
    data: SectionWithFeaturesData
}
const SectionWithFeaturesV1 = ({data}: SectionWithFeaturesV1Props) => {
    if (!data) {
        return null
    }

    const {headline, subline, features} = data
    return (
        <section id="one" className="wrapper style1 special">
            <div className="inner">
                <header className="major">
                    <Headline
                        data={headline}
                    ></Headline>
                    <Subline
                        data={subline}
                    ></Subline>

                </header>
                <ul className="icons major">


                    {
                        features?.map((feature, index) => (
                            <li className={"!space-y-2"} key={index}>
                                <Headline data={feature.headline}/>
                                <Subline data={feature.subline}/>
                                <Image
                                    className={" w-48 rounded-lg"}
                                    data={{
                                        image: feature?.media?.image,
                                        alt: feature?.media?.alt,
                                    }}/>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </section>
    )
}
export default SectionWithFeaturesV1
