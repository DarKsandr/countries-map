import {defineStore} from "pinia";
import Countries from "../countries";
import type Country from "../interfaces/Country";

export const useAppStore = defineStore('app', {
    state: () => ({
        code: null as null|string,
        zoom: 2,
        language: 'ru',
        shuffle: false,
        collect: false,
        check: false,
        isStart: false,
    }),
    getters: {
        country(): null|Country
        {
            const country = this.code
                ? Countries.find((item: Country) => item.code === this.code)
                : null;
            return country ? country : null;
        }
    },
    actions: {
        changeZoom(){
          if(this.country){
              this.zoom = this.country.zoom;
          }
        },
    },
});