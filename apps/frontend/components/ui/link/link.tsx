import React from 'react'
import Link, {LinkProps} from 'next/link'
import {LinkData} from '@/lib/types/ui/link'

type CustomLinkProps = {
    data: LinkData,
    className?: string,
    children?: React.ReactNode,
} & Omit<LinkProps, 'href'>

const CustomLink: React.FC<CustomLinkProps> = ({data, className, children, ...linkProps}) => {
    if (!data) return null

    const {url, ariaLabel, isExternal, label} = data

    return (
        <Link
            href={url}
            className={className}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabel ?? label}
            {...linkProps}
        >
            {label}
            {children}
        </Link>
    )
}

export default CustomLink
