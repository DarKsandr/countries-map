import type Coordinate from "./Coordinate.ts";
import type Language from "./Language.ts";

export default interface CountryItem {
    name: Language;
    code: string;
    image: string;
    width: number;
    height: number;
    coordinate: Coordinate;
}