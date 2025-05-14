import {Skeleton} from "@heroui/react";

export default function HeaderSkeletonV1() {
    return (
        <header className="fixed top-0 z-40 w-full bg-white dark:bg-black shadow-md py-6">
            <div className="container mx-auto lg:max-w-screen-2xl md:max-w-screen-md px-4">
                <div className="flex items-center justify-between">

                    <Skeleton className="h-6 w-24 rounded-md"/>

                    <nav className="hidden lg:flex gap-8 flex-grow justify-center">
                        {[...Array(4)].map((_, idx) => (
                            <Skeleton key={idx} className="h-4 w-16 rounded-md"/>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-6 rounded-full"/>
                        <div className="lg:hidden flex flex-col gap-1">
                            <Skeleton className="h-0.5 w-6"/>
                            <Skeleton className="h-0.5 w-6"/>
                            <Skeleton className="h-0.5 w-6"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
