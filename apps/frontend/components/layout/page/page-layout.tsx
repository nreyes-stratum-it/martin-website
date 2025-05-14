import React from 'react'
import {DynamicZoneRenderer} from "@/lib/helpers/dynamic-zone";
import {PagesData} from "@/lib/types/pages/pages";

export type PageLayoutProps = {
    data: PagesData
    locale: string
}

const PageLayout = ({data, locale}: PageLayoutProps) => {

    if (!data) {
        return null
    }

    return (
        <div className="flex flex-col w-full">
            {data.content?.map((content: any, i: number) => (
                <section key={i} className="h-auto w-full">
                    <DynamicZoneRenderer content={content} locale={locale}/>
                </section>
            ))}
        </div>
    )
}

export default PageLayout
