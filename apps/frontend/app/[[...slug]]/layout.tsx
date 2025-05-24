import {NextIntlClientProvider} from "next-intl";
import {Providers} from "@/app/providers";
import {resolveLocaleAndSlug} from "@/lib/helpers/routing/resolve-locale";
import {Suspense} from "react";
import HeaderSkeletonV1 from "@/components/layout/global/header/variants/header-v1/partials/header-skeleton-v1";
import {Metadata} from "next";
import {toPath} from "@/lib/utils/slug-to-path";
import {buildNextMetadata} from "@/lib/helpers/routing/metadata/build-next-metadata";
import Header from "@/components/layout/global/header/header";
import {createRoutingService} from "@/lib/factories/create-routing-service";

export const dynamic = "force-static";

type GenerateMetadataProps = {
    params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({params}: GenerateMetadataProps,): Promise<Metadata> {
    const {slug: segments = []} = await params;

    const {locale, slugPart} = resolveLocaleAndSlug(segments);
    const slugPath = toPath(slugPart);
    const relativeMetadata = await createRoutingService().getMetadata(slugPath, locale);
    return buildNextMetadata(relativeMetadata)
}


type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug?: string[] }>;
}
export default async function Layout({children, params,}: LayoutProps) {

    const {slug: segments = []} = await params;

    const {locale, slugPart} = resolveLocaleAndSlug(segments);

    return (
        <NextIntlClientProvider locale={locale}>
            <Providers themeProps={{attribute: "class", defaultTheme: "system"}}>
                <Suspense fallback={<HeaderSkeletonV1></HeaderSkeletonV1>}>
                    <Header

                        locale={locale}
                        slug={slugPart}
                    ></Header>
                </Suspense>
                {children}

            </Providers>
        </NextIntlClientProvider>
    );
}
