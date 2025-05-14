import React from 'react'
import {LogoData} from "@/lib/types/ui/logo";
import {Image} from "@/components/ui/image/image";

type LogoProps = {
    data?: LogoData | null;
}

const Logo = ({data}: LogoProps) => {
    if (!data) return null;
    const {media, text} = data;
    return (
        <>
            {
                media?.image ? (
                    <Image
                        className={"w-20 h-14 lg:w-40 lg:h-20 object-cover"}
                        data={{
                            image: media?.image,
                            alt: media?.alt,
                        }}></Image>
                ) : (

                    (
                        text
                    )

                )
            }
        </>
    )
}
export default Logo
