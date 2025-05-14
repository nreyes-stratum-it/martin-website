"use client";

import {useState, useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import {ChevronDown, ChevronUp} from "./partials/icons";

interface ILanguage {
    code: string;
    name: string;
}

const LANGUAGES: ILanguage[] = [
    {code: "es", name: "Spanish"},
    {code: "en", name: "English"},
    {code: "de", name: "Deutsch"},
];

const DEFAULT = "en";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<ILanguage>(LANGUAGES[1]); // en

    useEffect(() => {
        if (!pathname) return;

        const parts = pathname.split("/");
        const first = parts[1];
        const locale =
            first && first.length === 2 && first !== DEFAULT ? first : DEFAULT;

        setSelected(LANGUAGES.find((l) => l.code === locale)!);
    }, [pathname]);

    const buildPath = (target: string) => {
        const parts = pathname.split("/").filter(Boolean);

        if (parts[0]?.length === 2 && parts[0] !== DEFAULT) parts.shift();
        if (target !== DEFAULT) parts.unshift(target);

        return "/" + parts.join("/");
    };

    const changeLang = (lang: ILanguage) => {
        setSelected(lang);
        setIsOpen(false);
        router.push(buildPath(lang.code));
    };

    return (
        <div className="relative language-switcher">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen((o) => !o);
                }}
                className="capitalize flex items-center justify-between w-auto px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <span className="text-indigo-900">{selected.code}</span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 ml-2 text-gray-400"/>
                ) : (
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-400"/>
                )}
            </button>

            {isOpen && (
                <div className="absolute z-10 w-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <ul className="overflow-auto" role="listbox">
                        {LANGUAGES.map((lang) => (
                            <li
                                key={lang.code}
                                role="option"
                                aria-selected={selected.code === lang.code}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    changeLang(lang);
                                }}
                                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                                    selected.code === lang.code
                                        ? "bg-indigo-100 text-indigo-900"
                                        : "text-gray-900"
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="capitalize">{lang.code}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
