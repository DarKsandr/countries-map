import type Coordinate from "./Coordinate.ts";

export default interface Country {
    name: string;
    code: string;
    items: [
        {
            name: string;
            code: string;
            image: string;
            coordinate: Coordinate;
        }
    ]
}