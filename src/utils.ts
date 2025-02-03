export function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
}