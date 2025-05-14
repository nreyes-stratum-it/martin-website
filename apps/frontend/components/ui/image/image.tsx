"use client";
import React, {useState} from "react";
import {ImageDataWithCustomAltAndDescription} from "@/lib/types/ui/image";
import {getMediaUrl} from "@/lib/helpers/media/media";

type ImageComponentProps = {
    data: ImageDataWithCustomAltAndDescription;
    className?: string;
};

export const Image = ({data, className = ""}: ImageComponentProps) => {
    const {image, alt, description} = data ?? {};
    const [hasError, setHasError] = useState(false);



    const url = image?.url ? getMediaUrl(image.url) : null;

    const fallbackText = "Image not available";

    return (
        <figure>
            {url && !hasError ? (
                <img
                    src={url}
                    width={image?.width}
                    height={image?.height}
                    alt={alt ?? image?.alternativeText ?? ""}
                    className={className}
                    loading="lazy"
                    decoding="async"
                    onError={() => setHasError(true)}
                />
            ) : (
                <div
                    className={`bg-gray-200 dark:bg-gray-700 w-full h-[310px] rounded-lg flex items-center justify-center text-gray-500 ${className}`}
                >
                    {fallbackText}
                </div>
            )}

            {description && (
                <figcaption className="text-left text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {description}
                </figcaption>
            )}
        </figure>
    );
};
