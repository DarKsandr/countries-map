export function randomInteger(min: number, max: number) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function deepClone(obj: any){
    return JSON.parse(JSON.stringify(obj));
}
