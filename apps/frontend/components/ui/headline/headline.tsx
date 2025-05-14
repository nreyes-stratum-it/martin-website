"use client";

import React from "react";
import dynamic from "next/dynamic";
import {HeadlineData} from "@/lib/types/ui/headline";

const MarkdownComponent = dynamic(() => import("@/components/internal/markdown/markdown"), {
    loading: () => <></>,
    ssr: false,
});

type HeadlineProps = {
    data?: HeadlineData | null;
    classNames?: string;
};

const HeadLine = ({data, classNames}: HeadlineProps) => {
    if (!data) {
        return null;
    }

    const {text, tag} = data;
    if (!text) return null;

    return (
        <MarkdownComponent
            classNames={classNames}
            text={text}
            as={tag || "div"}
        />
    );
};

export default HeadLine;
