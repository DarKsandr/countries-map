import {defineStore} from "pinia";
import Countries from "../countries";

export const useAppStore = defineStore('app', {
    state: () => ({
        code: null,
        zoom: 2,
        language: 'ru',
        shuffle: false,
        collect: false,
        check: false,
    }),
    getters: {
        country(){
            return this.code
                ? Countries.find(item => item.code === this.code)
                : null;
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