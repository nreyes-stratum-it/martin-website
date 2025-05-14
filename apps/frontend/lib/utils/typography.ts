export function getHeadlineSize(tag: string | undefined) {
    switch (tag) {
        case "h1":
            return "text-2xl md:text-4xl lg:text-5xl font-bold";
        case "h2":
            return "text-xl md:text-3xl lg:text-4xl font-semibold";
        case "h3":
            return "text-lg md:text-2xl lg:text-3xl font-medium";
        case "h4":
            return "text-base md:text-xl lg:text-2xl font-normal";
        case "h5":
            return "text-sm md:text-lg lg:text-xl";
        case "h6":
            return "text-xs md:text-base lg:text-lg";
        default:
            return "text-base md:text-xl lg:text-2xl"; // fallback
    }
}
