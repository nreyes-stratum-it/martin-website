import dynamicMap from "@/lib/const/dynamic-map/dynamic-map";

export const DynamicZoneRenderer = ({content, locale,}: {
    content: any;
    locale: string;
}) => {
    const Component = dynamicMap[content.__component as keyof typeof dynamicMap];

    if (!Component) {
        console.warn(`Missing component: ${content.__component}`);
        return null;
    }


    return <Component data={content} locale={locale}/>;
};
