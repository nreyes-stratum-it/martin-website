"use client"

import {prefixMenuLinks} from "@/lib/helpers/routing/prefix-menu-links";
import {HeaderData} from "@/lib/types/global/header/header";
import dynamic from "next/dynamic";

const HeaderClientV1 = dynamic(() => import("./partials/header-client-v1"), {ssr: false});


type HeaderV1Props = {
    data: HeaderData;
    locale: string;
};

const HeaderV1 = ({data, locale}: HeaderV1Props) => {
    const updatedHeader = prefixMenuLinks(data, locale);

    return <HeaderClientV1 data={updatedHeader} locale={locale}/>;
};

export default HeaderV1;
