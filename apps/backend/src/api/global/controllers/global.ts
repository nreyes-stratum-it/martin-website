import {factories} from "@strapi/strapi";

export default factories.createCoreController("api::global.global", ({strapi}) => ({
    async header(ctx) {
        const {query} = ctx;
        const requestedLocale = query?.locale || "en";
        
        const buildPopulateStructure = (componentName: string): any => {
            const componentDefinition = strapi.components[componentName];
            if (!componentDefinition) return "*";

            const populateFields: Record<string, any> = {};

            for (const [field, fieldDef] of Object.entries(componentDefinition.attributes || {})) {
                if ((fieldDef as any).type === "component") {
                    populateFields[field] = {
                        populate: buildPopulateStructure((fieldDef as any).component),
                    };
                } else if ((fieldDef as any).type === "media") {
                    populateFields[field] = true;
                } else if ((fieldDef as any).type === "relation") {
                    populateFields[field] = {
                        populate: "*",
                    };
                }
            }

            return Object.keys(populateFields).length > 0 ? populateFields : "*";
        };

        
        
        const populateHeader = {
            header: {
                populate: buildPopulateStructure("layout.header"),
            },
        };

        const response = await strapi.service("api::global.global").find({
            ...query,
            populate: populateHeader,
            locale: requestedLocale,
        });

        const header = response?.header;

        if (!header && requestedLocale !== "en") {
            const fallback = await strapi.service("api::global.global").find({
                ...query,
                populate: populateHeader,
                locale: "en",
            });
            return {data: fallback?.data?.attributes?.header || null};
        }

        return { header};
    },
}));
