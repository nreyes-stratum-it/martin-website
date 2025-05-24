import React from 'react'
import {SectionWithFeaturesData} from "@/lib/types/pages/sections/section-with-features/section-with-features";
import {Icon} from "@iconify/react";

type SectionWithFeaturesV3Props = {
    data: SectionWithFeaturesData
}

const features = [


    {
        name: 'Invite team members',
        description: 'Rerum repellat labore necessitatibus reprehenderit molestiae praesentium.',
    },
    {name: 'List view', description: 'Corporis asperiores ea nulla temporibus asperiores non tempore assumenda aut.'},
    {
        name: 'Keyboard shortcuts',
        description: 'In sit qui aliquid deleniti et. Ad nobis sunt omnis. Quo sapiente dicta laboriosam.',
    },
    {name: 'Calendars', description: 'Sed rerum sunt dignissimos ullam. Iusto iure occaecati voluptate eligendi.'},
    {name: 'Notifications', description: 'Quos inventore harum enim nesciunt. Aut repellat rerum omnis adipisci.'},
    {name: 'Boards', description: 'Quae sit sunt excepturi fugit veniam voluptatem ipsum commodi.'},
    {name: 'Reporting', description: 'Eos laudantium repellat sed architecto earum unde incidunt.'},
    {name: 'Mobile app', description: 'Nulla est saepe accusamus nostrum est est fugit omnis.'},
]

const SectionWithFeaturesV3 = ({data}: SectionWithFeaturesV3Props) => {
    return (
        <div className=" !py-24 sm:!py-32 wrapper style3 special">
            <div className="!mx-auto !w-[90%] lg:!max-w-7xl ">
                <div
                    className="!mx-auto !grid !max-w-2xl !grid-cols-1 !gap-x-8 !gap-y-16 sm:!gap-y-20 lg:!mx-0 lg:!max-w-none lg:!grid-cols-5">
                    <div className="!col-span-2 !space-y-6">
                        <h2 className="!text-base/7 !mb-1.5  !font-semibold !text-white">Everything you need</h2>
                        <p className="
                        prose prose-a:text-default-600 dark:prose-invert !text-white !text-xl md:!text-2xl lg:!text-3xl !font-bold !uppercase
                        text-pretty">
                            All-in-one platform
                        </p>
                        <p className="
                        prose prose-a:text-default-600 dark:prose-invert    !text-gray-200  !font-mono !font-thin !max-w-3xl  !text-lg md:!text-md lg:!text-lg
                        ">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                            suscipit eaque, iste
                            dolor cupiditate blanditiis ratione.
                        </p>
                    </div>
                    <dl className="!col-span-3 !grid !grid-cols-1 !gap-x-8 !gap-y-10 !text-base/7 !text-gray-600 sm:!grid-cols-2 lg:!gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="!relative !pl-9">
                                <dt className="!font-semibold !text-white !text-lg">

                                    <Icon
                                        icon={"material-symbols:check-circle"}
                                        className="!absolute !left-0 !top-1 !size-5 text-[#FAFAFF]/90 "

                                    ></Icon>
                                    {feature.name}
                                </dt>
                                <dd className="prose prose-a:!text-default-600 dark:!prose-invert !text-[14px] !text-gray-300 !m-0">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
export default SectionWithFeaturesV3
