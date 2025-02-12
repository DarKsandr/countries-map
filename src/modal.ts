import {Modal} from 'bootstrap';

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