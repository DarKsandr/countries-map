import {Modal} from 'bootstrap';

export function randomInteger(min: number, max: number) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function deepClone(obj: any){
    return JSON.parse(JSON.stringify(obj));
}

function getModalElement(res: any){
    if(!res){
        throw new Error('Res is empty!');
    }
    if(res instanceof HTMLElement){
        return res;
    }
    if(res?.modal){
        return getModalElement(res.modal);
    }
    throw new Error('Res not found modal element!');
}

export function modal(res: any){
    const element: HTMLElement = getModalElement(res);
    const modal = new Modal(element);
    modal.show();

    return modal;
}