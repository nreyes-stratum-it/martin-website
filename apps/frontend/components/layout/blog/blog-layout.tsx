import React from 'react'
import Headline from '@/components/ui/headline/headline';
import Paragraph from '@/components/ui/paragraph/paragraph';
import {getHeadlineSize} from '@/lib/utils/typography';
import {Image} from "@/components/ui/image/image";

type BlogLayoutProps = {
    data: any,
    locale: string
}

const BlogLayout = ({data, locale}: BlogLayoutProps) => {
    return (
        <div className="py-20 lg:py-56 dark:bg-[var(--dark-sections)]">
            <div className="flex flex-col items-center justify-center gap-12 w-[70%] lg:max-w-7xl mx-auto">
             {/*   {data.content.map((block: any, i: number) => {
                    const typedBlock = block
                    const id = `${typedBlock?.id ?? typedBlock.__component}-${i}`;

                    switch (typedBlock.__component) {
                        case COMPONENTS.HEADLINE: {
                            const tag = (typedBlock.tag as keyof JSX.IntrinsicElements) || "div";
                            const sizeClass = getHeadlineSize(tag);
                            return (
                                <Headline
                                    key={id}
                                    data={typedBlock}
                                    classNames={"prose text-center dark:prose-invert font-bold" + sizeClass}
                                />
                            );
                        }
                        case COMPONENTS.PARAGRAPH: {
                            return (
                                <Paragraph
                                    key={id}
                                    data={typedBlock}
                                    classNames="text-default-700 font-light lg:text-lg font-roboto"
                                />
                            );
                        }
                        case COMPONENTS.IMAGE: {
                            return <Image key={id} data={typedBlock}/>;
                        }
                        default: {
                            throw new Error(`Unhandled component type: ${(typedBlock as any).__component}`);
                        }
                    }
                })}*/}

            </div>
        </div>
    )
}

export default BlogLayout
