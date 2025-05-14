import React from "react";


const CertificationLayout = ({data, locale}: any) => {
    return (
        <div className="py-20 lg:py-56 dark:bg-[var(--dark-sections)]">
            <div className="flex flex-col gap-12 w-[90%] lg:max-w-7xl mx-auto">
                {/*  {data?.content?.map((block, i) => {
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
                                    classNames={"prose text-left dark:prose-invert font-bold " + sizeClass}
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
    );
};

export default CertificationLayout;
