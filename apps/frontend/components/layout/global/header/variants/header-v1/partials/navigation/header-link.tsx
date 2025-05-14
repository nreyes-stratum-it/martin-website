"use client";
import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";
import {normalizeSlug} from "@/lib/utils/normalize-slug";
import CustomLink from "@/components/ui/link/link";
import {LinkData} from "@/lib/types/ui/link";

export type HeaderItem = {
    link: LinkData | null,
    submenu?: LinkData [] | null;
};

const HeaderLink = ({link, submenu}: HeaderItem) => {

    const {url} = link ?? {};

    const [submenuOpen, setSubmenuOpen] = useState(false);
    const path = usePathname();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {

        const isLinkActive = (normalizeSlug(path) === normalizeSlug(url) || (submenu && submenu.some(subItem => path === subItem.url))) ?? false;

        setIsActive(isLinkActive);
    }, [path, url, submenu]);

    const handleMouseEnter = () => {
        if (submenu) {
            setSubmenuOpen(true);
        }
    };

    const handleMouseLeave = () => {
        setSubmenuOpen(false);
    };

    if (!link) {
        return null;
    }

    return (
        <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <CustomLink
                className={`text-lg flex hover:text-black capitalized relative  ${isActive
                    ? " after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1"
                    : "text-grey"
                }`}
                data={link}>
                {submenu && (
                    <svg
                        className={"inline ml-1"}
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m7 10l5 5l5-5"
                        />
                    </svg>
                )}
            </CustomLink>

            {submenuOpen && (
                <span
                    className={`absolute py-2 left-0 mt-0.5 w-60  dark:text-white shadow-lg rounded-lg `}
                    data-aos="fade-up"
                    data-aos-duration="500"
                >
                    {submenu?.map((subItem, index) => {
                        const isSubItemActive = path === subItem.url;
                        return (
                            <CustomLink
                                className={`block px-4 py-2 ${isSubItemActive
                                    ? "bg-primary text-white"
                                    : "text-black dark:text-white hover:bg-primary"
                                }`}
                                key={index}
                                data={subItem}></CustomLink>

                        );
                    })}

                </span>
            )}

        </li>
    );
};

export default HeaderLink;
