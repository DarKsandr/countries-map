import {Modal} from 'bootstrap';

export function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function confirmModal(res: HTMLElement|object){
    const element: HTMLElement = typeof res === HTMLElement ? res : res?.modal;
    const modal = new Modal(element);
    modal.show();

    return modal;
}