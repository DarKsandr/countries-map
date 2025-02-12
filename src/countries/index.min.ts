import type Country from "../interfaces/Country";

const obj = import.meta.glob('./files/**/config.min.json', { eager: true });
const configs: Country[] = [];
for(const key in obj){
    const country: any = obj[key];
    configs.push({
        name: country.name,
        code: country.code,
        zoom: country.zoom,
        items: [],
    });
}

export default configs;