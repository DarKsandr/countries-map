import type CountryItem from "./CountryItem.ts";

export default interface Country {
    name: string;
    code: string;
    items: [
        CountryItem
    ]
}