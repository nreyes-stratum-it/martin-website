"use client";

import {SectionBusinessData} from "@/lib/types/pages/sections/section-business/section-business";
import {Image} from "@/components/ui/image/image";
import {Icon} from "@iconify/react";
import {getSocialIconName} from "@/lib/const/icon-social-media/icon-social-media";
import Link from "@/components/ui/link/link";
import Paragraph from "@/components/ui/paragraph/paragraph";
import {UI} from "@/lib/const/components/ui/components-key";
import {downloadVCard} from "@/lib/utils/generate-v-card";


type SectionBusinessV1Props = { data: SectionBusinessData };

const SectionBusinessV1 = ({data}: SectionBusinessV1Props) => {
    if (!data?.person) return null;

    const {background} = data
    const {name, position, phone, avatar, biography, social_links = [], recommended_links = [],} = data.person;

    const positions = position?.split(",").join(" | ")


    return (
        <div className="!bg-gray-900 !h-screen !flex !items-center !justify-center !p-2">
            <div className="!bg-white !p-8 !rounded-lg !shadow-md !max-w-xl !w-full">

                <div className="!relative">
                    <Image
                        className={"!w-full !rounded-t-lg !h-[200px] object-cover"}
                        data={{
                            image: background?.image,
                            alt: name
                        }}
                    ></Image>
                    <Image
                        className={"!absolute !object-cover !bottom-0 !left-2/4 !transform !-translate-x-1/2 !translate-y-1/2 !w-24 !h-24 !rounded-full !border-4 !border-white"}
                        data={{
                            image: avatar,
                            alt: name
                        }}
                    ></Image>
                </div>
                <div
                    className={"flex flex-col  !mt-14"}
                >
                    <div
                        className={"flex flex-col-reverse items-start sm:flex-row justify-between sm:items-center gap-y-2 "}
                    >
                        <div className={"!flex !items-center  "}>
                            <h2 className="!text-base !md:text-xl !font-bold !text-gray-800 !inline-block !my-0 !whitespace-pre-wrap">
                                {name}
                            </h2>

                            <div className=" !px-2  max-h-full">
                                <svg fill="#4d9aff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                     xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px"
                                     viewBox="0 0 536.541 536.541" xmlSpace="preserve" stroke="#4d9aff">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <g>
                                                <path
                                                    d="M496.785,152.779c-3.305-25.085-16.549-51.934-38.826-74.205c-22.264-22.265-49.107-35.508-74.186-38.813 c-11.348-1.499-26.5-7.766-35.582-14.737C328.111,9.626,299.764,0,268.27,0s-59.841,9.626-79.921,25.024 c-9.082,6.965-24.235,13.238-35.582,14.737c-25.08,3.305-51.922,16.549-74.187,38.813c-22.277,22.271-35.521,49.119-38.825,74.205 c-1.493,11.347-7.766,26.494-14.731,35.57C9.621,208.422,0,236.776,0,268.27s9.621,59.847,25.024,79.921 c6.971,9.082,13.238,24.223,14.731,35.568c3.305,25.086,16.548,51.936,38.825,74.205c22.265,22.266,49.107,35.51,74.187,38.814 c11.347,1.498,26.5,7.771,35.582,14.736c20.073,15.398,48.421,25.025,79.921,25.025s59.841-9.627,79.921-25.025 c9.082-6.965,24.234-13.238,35.582-14.736c25.078-3.305,51.922-16.549,74.186-38.814c22.277-22.27,35.521-49.119,38.826-74.205 c1.492-11.346,7.766-26.492,14.73-35.568c15.404-20.074,25.025-48.422,25.025-79.921c0-31.494-9.621-59.848-25.025-79.921 C504.545,179.273,498.277,164.126,496.785,152.779z M439.256,180.43L246.477,373.209l-30.845,30.846 c-8.519,8.52-22.326,8.52-30.845,0l-30.845-30.846l-56.665-56.658c-8.519-8.52-8.519-22.326,0-30.846l30.845-30.844 c8.519-8.519,22.326-8.519,30.845,0l41.237,41.236L377.561,118.74c8.52-8.519,22.326-8.519,30.846,0l30.844,30.845 C447.775,158.104,447.775,171.917,439.256,180.43z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div>
                            {phone && (
                                <a href={`tel:${phone}`} aria-label="Phone number" className="text-gray-950">
                                    <Icon icon="mdi:phone" className={"text-green-600"} width={25} height={25}/>
                                </a>
                            )}

                        </div>

                    </div>


                    {(positions || position) && (
                        <p className="!text-gray-700 !my-0 !text-pretty !text-base md:!text-lg">
                            {positions || position}
                        </p>
                    )}

                    <div className="flex justify-between items-center gap-2 !my-4 ">

                        {
                            recommended_links?.map((link, index) => (
                                <Link
                                    key={index}
                                    data={link}
                                    className={"!text-gray-500 !shadow-none !border solid !no-underline hover:!text-gray-900 !border-gray-300 !bg-gray-50 hover:!bg-gray-100 !rounded !transition !duration-150 !ease-in !font-medium !text-sm !text-center !w-full !py-3"}
                                ></Link>
                            ))
                        }

                    </div>

                    <div className="!flex !items-center !space-x-4 ">
                        {
                            social_links?.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    {...(link.ariaLabel ? {"aria-label": link.ariaLabel} : {})}
                                    target={link.isExternal ? "_blank" : "_self"}
                                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    <Icon
                                        className="text-gray-950"
                                        icon={getSocialIconName(link.label)}
                                        width={25}
                                        height={25}
                                    />
                                </a>
                            ))
                        }
                    </div>


                </div>

                <hr className="!my-4  !border-t !border-gray-300"/>

                {
                    biography && (
                        <Paragraph
                            data={{
                                text: biography,
                                tag: "p",
                                __component: UI.PARAGRAPH
                            }}
                            classNames="!text-gray-500 !py-3 !my-0 !text-pretty prose prose-strong:!text-black   !prose-p:!mb-2 !text-sm">

                        </Paragraph>
                    )
                }

                <div className="flex justify-center items-center gap-2 !my-4 ">
                    <button
                        onClick={() => downloadVCard(data?.person)}
                        className={"!text-gray-500 !shadow-none !border solid !no-underline hover:!text-gray-900 !border-gray-300 !bg-gray-50 hover:!bg-gray-100 !rounded !transition !duration-150 !ease-in !font-medium !text-sm !text-center !w-full !py-3"}
                    >
                        Download vCard
                    </button>
                </div>
            </div>
        </div>
    )
};

export default SectionBusinessV1;
