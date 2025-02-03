import type CountryItem from "./CountryItem.ts";
import type Language from "./Language.ts";

export default interface Country {
    name: Language;
    code: string;
    zoom: number;
    items: Array<CountryItem>,
}