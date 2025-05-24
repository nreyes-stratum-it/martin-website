import {TeamData} from "@/lib/types/team/team";

const escapeVCard = (value = "") =>
    value.replace(/[\\;,]/g, "\\$&");

const slugify = (value = "") =>
    value.trim().toLowerCase().replace(/\s+/g, "_");

export const downloadVCard = (person?: TeamData | null): void => {
    if (!person) return;

    const {name, position, phone, social_links} = person;

    const email = social_links
        ?.find((l) => l.label === "email")
        ?.url.replace(/^mailto:/i, "");

    const vCardLines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(name)}`,
        `FN:${escapeVCard(name)}`,
        position ? `TITLE:${escapeVCard(position)}` : null,
        phone ? `TEL;TYPE=work,voice:${phone}` : null,
        email ? `EMAIL;TYPE=internet,pref:${email}` : null,
        "END:VCARD",
    ]
        .filter(Boolean)
        .join("\r\n");

    const blob = new Blob([vCardLines], {
        type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slugify(name)}.vcf`;

    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
};
