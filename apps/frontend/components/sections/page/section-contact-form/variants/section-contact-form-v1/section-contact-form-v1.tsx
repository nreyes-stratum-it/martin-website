"use client";
import React from 'react';
import Headline from "@/components/ui/headline/headline";
import Subline from "@/components/ui/subline/subline";
import {SectionContactFormData} from "@/lib/types/pages/sections/section-contact-form/section-contact-form";
import dynamic from "next/dynamic";

const ContactFormV1 = dynamic(() => import("./partials/contact-form-v1"), {ssr: false});

type SectionContactFormV1Props = {
    data: SectionContactFormData;
};


const SectionContactFormV1 = ({data}: SectionContactFormV1Props) => {

    if (!data) return null;

    const {form, subline, headline} = data;

    return (

        <div
            className={"relative"}
        >
            <div
                className="absolute !z-0 top-0 left-0 w-full h-[750px] lg:h-[700px]  bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.7),rgba(0,0,0,1)),url('/img/laptop-human.jpg')] bg-cover bg-center bg-no-repeat"/>

            <div className={"!space-y-14 relative !z-50 lg:!space-y-20 lg:!max-w-4xl !mx-auto "}>

                <div
                    className={"!pt-14 lg:!pt-20 !space-y-4"}
                >
                    <Headline
                        classNames="text-white !text-xl md:!text-2xl lg:!text-3xl font-bold text-center uppercase"
                        data={headline}
                    />
                    <Subline
                        classNames="!text-gray-300 text-center !mb-0 !font-mono !font-thin !mx-auto lg:!max-w-3xl mt-4 text-lg md:!text-md lg:!text-lg "
                        data={subline}
                    />
                </div>



                    <ContactFormV1 data={form}></ContactFormV1>

            </div>
        </div>
    );
};

export default SectionContactFormV1;