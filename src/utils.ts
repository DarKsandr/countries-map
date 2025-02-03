import {Modal} from 'bootstrap';

export function randomInteger(min: number, max: number) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function deepClone(obj: any){
    return JSON.parse(JSON.stringify(obj));
}

export function confirmModal(res: any){
    if(!res){
        console.warn('Res is null!');
        return;
    }
    const element: HTMLElement = res instanceof HTMLElement ? res : res?.modal;
    const modal = new Modal(element);
    modal.show();

    return modal;
}