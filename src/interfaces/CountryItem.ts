import type Coordinate from "./Coordinate.ts";

export default interface CountryItem {
    name: string;
    code: string;
    image: string;
    width: number;
    height: number;
    coordinate: Coordinate;
}