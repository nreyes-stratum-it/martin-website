"use client"
import React from "react";
import {ParagraphData} from "@/lib/types/ui/paragraph";
import dynamic from "next/dynamic";

const MarkdownComponent = dynamic(() => import("@/components/internal/markdown/markdown"), {
    loading: () => <></>,
    ssr: false,
});

type ParagraphProps = {
    data: ParagraphData;
    classNames?: string;
};

const Paragraph = ({data, classNames}: ParagraphProps) => {
    const {text, tag} = data || {};

    if (!text) {
        return null;
    }
    return (
        <MarkdownComponent
            classNames={classNames}
            text={text}
            as={tag || "div"}
        ></MarkdownComponent>
    );
};

export default Paragraph;
