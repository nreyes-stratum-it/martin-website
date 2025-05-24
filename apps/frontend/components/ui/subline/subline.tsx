"use client"
import React from 'react'
import {SublineData} from "@/lib/types/ui/subline";
import dynamic from "next/dynamic";

const MarkdownComponent = dynamic(() => import("@/components/internal/markdown/markdown"), {
    loading: () => <></>,
    ssr: false,
});

type SublineProps = {
    data?: SublineData | null;
    classNames?: string;
}

const Subline = ({data, classNames}: SublineProps) => {
    if (!data) {
        return null
    }

    const {text, tag} = data;

    if (!text) return null;
    
    return (
        <MarkdownComponent
            classNames={classNames}
            text={text}
            as={tag || "div"}
        />
    )
}
export default Subline
