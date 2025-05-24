export const generateName = (label: string): string =>
    label
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .trim()
        .split(/\s+/)
        .map((word, i) =>
            i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');