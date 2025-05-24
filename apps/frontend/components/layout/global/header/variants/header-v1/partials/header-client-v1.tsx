"use client";
import Link from "next/link";
import HeaderLink from "@/components/layout/global/header/variants/header-v1/partials/navigation/header-link";
import {HeaderData} from "@/lib/types/global/header/header";
import {DEFAULT_LOCALE} from "@/lib/const/locale/locale";
import {normalizeSlug} from "@/lib/utils/normalize-slug";
import Logo from "@/components/ui/logo/logo";
import Script from "next/script";

type HeaderClientProps = {
    data?: HeaderData | null;
    locale?: string;
}
const HeaderClientV1 = ({data, locale}: HeaderClientProps) => {

    if (!data) return null;

    const logoHref = locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
    const {logo, menu_link} = data ?? {};

    return (
        <header id="header" className="alt">
            <h1>
                <Link href={normalizeSlug(logoHref)}>
                    <Logo data={logo}/>
                </Link>
            </h1>

            <nav id="nav">
                <ul>
                    <li className="special" suppressHydrationWarning={true}>
                        <a href="#menu" className="menuToggle"><span>Menu</span></a>
                        <div id="menu">
                            <ul>
                                {menu_link && menu_link?.map((item, index) => {
                                        return (
                                            <HeaderLink key={index} link={item.link} submenu={item.submenu_link?.link}/>
                                        )
                                    }
                                )}
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>

            <Script
                src="/js/main.js"
                strategy="afterInteractive"
            />
        </header>
    );
};

export default HeaderClientV1;
