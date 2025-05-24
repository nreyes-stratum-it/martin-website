import {resolveLocaleAndSlug} from "@/lib/helpers/routing/resolve-locale";
import {Content} from "@/lib/types/content/content";
import {ContentType} from "@/lib/const/content/content";
import {createRoutingService} from "@/lib/factories/create-routing-service";
import {StaticParams} from "@/lib/types/routing/static-params";
import PageLayout from "@/components/layout/page/page-layout";
import {fetchContent} from "@/lib/helpers/content/content";
import {notFound} from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams(): Promise<StaticParams> {
    const result = await createRoutingService().getStaticParams();
    return result ?? [{slug: [""]}];
}


type DynamicPageProps = {
    params: Promise<{ slug?: string[] }>;
}

export default async function DynamicPage({params}: DynamicPageProps) {
    const {slug: segments = []} = await params;

    const {locale, slugPart} = resolveLocaleAndSlug(segments);

    const contentResult = await fetchContent({locale, slug: slugPart}) //todo we need implement new api endpoint for this and support for json content

    if (!contentResult) return notFound();

    return (
        <div id="wrapper" className="w-full py-20">
            {renderPageContent(contentResult, locale)}
        </div>
    );
}

function renderPageContent(contentResult: Content, locale: string) {
    switch (contentResult.type) {
        case ContentType.PAGE:
            return (
                <PageLayout data={contentResult.data} locale={locale}></PageLayout>
            );
        default:
            return <div>Unknown content type: {contentResult.type}</div>;
    }
}
