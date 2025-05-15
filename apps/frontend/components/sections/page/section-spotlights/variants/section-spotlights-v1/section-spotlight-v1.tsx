import React from "react";
import {SectionSpotlightsData} from "@/lib/types/pages/sections/section-spotlights/section-spotlights";
import {Image} from "@/components/ui/image/image";
import Headline from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";

type SectionSpotlightsV1Props = {
    data: SectionSpotlightsData;
};

const SectionSpotlightsV1 = ({data}: SectionSpotlightsV1Props) => {
    if (!data?.spotlights?.length) return null;

    return (
        <section id="two" className="wrapper alt style2">
            {data.spotlights.map((spotlight) => (
                <section className="spotlight" key={spotlight.id}>
                    <div className="image">
                        <Image
                            data={{
                                image: spotlight?.media?.image,
                                alt: spotlight?.media?.alt
                            }}
                        ></Image>

                    </div>
                    <div className="content">
                        <Headline data={spotlight.headline}></Headline>
                        <Subline data={spotlight.subline}></Subline>
                    </div>
                </section>
            ))}
        </section>
    );
};

export default SectionSpotlightsV1;
