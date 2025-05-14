import {PagesData} from "@/lib/types/pages/pages";
import {ContentType} from "@/lib/const/content/content";

type PageContent = {
    type: typeof ContentType.PAGE;
    data: PagesData;
};

export type Content = PageContent;
