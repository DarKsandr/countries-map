import {defineStore} from "pinia";
import type Country from "../interfaces/Country";
import { ROUND, ZOOM } from "../const";
import { deepClone } from "../utils";

export const useAppStore = defineStore('app', {
    state: () => ({
        code: null as null|string,
        zoom: ZOOM,
        round: ROUND,
        language: 'ru',
        shuffle: false,
        collect: false,
        check: false,
        isMove: true,
        countries: [] as Country[],
        country: null as null|Country,
    }),
    actions: {
        async setCountry(){
            this.country = null;
            if(this.code){
                const res = await import(`./../countries/files/${this.code}/config.json`);
                this.country = deepClone(res.default);
            }
        },
        changeZoom(){
            this.zoom = ZOOM;
            if(this.country){
                this.zoom = this.country.zoom;
            }
        },
    },
});