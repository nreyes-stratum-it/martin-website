import {createPageService} from "@/lib/factories/create-page-service";
import {Content} from "@/lib/types/content/content";
import {ContentType} from "@/lib/const/content/content";
import {toPath} from "@/lib/utils/slug-to-path";

type FetchContentProps = {
    locale: string;
    slug: string[];
}
export async function fetchContent({locale, slug}: FetchContentProps): Promise<Content | null> {

    const slugPath = toPath(slug);

    const page = await createPageService().getPageBySlug(slugPath, locale);

    return page ? {type: ContentType.PAGE, data: page} : null;
}
