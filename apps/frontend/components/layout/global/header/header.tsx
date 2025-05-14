import {StrapiGlobalProvider} from "@/lib/providers/global/strapi-global-provider/strapi-global-provider";
import {httpClient} from "@/lib/config/instances";
import {prefixMenuLinks} from "@/lib/helpers/routing/prefix-menu-links";
import {StrapiPageProvider} from "@/lib/providers/page/strapi-page-provider";
import {toPath} from "@/lib/utils/slug-to-path";
import HeaderV1 from "@/components/layout/global/header/variants/header-v1/header-v1";

type HeaderProps = {
    locale: string;
    slug: string[];
}
const Header = async ({locale, slug}: HeaderProps) => {
    const slugPath = toPath(slug);

    const data = await new StrapiGlobalProvider(httpClient).getHeader(locale);

    if (!data) {
        return null;
    }

    /*const languageSwitcher = await new StrapiPageProvider(httpClient).getPageLanguageVariants(slugPath, locale);*/


    return <HeaderV1 data={data} locale={locale}/>;
};

export default Header;
