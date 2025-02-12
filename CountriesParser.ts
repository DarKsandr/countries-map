import { parse } from 'svg-parser';
import {rm, mkdir, writeFile, readFile} from 'fs/promises';
import {Box, registerWindow, SVG} from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import type Country from "./src/interfaces/Country";
import translate from "translate";
import type Language from "./src/interfaces/Language";
import path from 'node:path';
import language from './src/language';
import files from './src/countries/map.json';
import LanguageDetect from 'languagedetect';
import {deepClone} from './src/utils';

const ROOT = `./src/countries/files/`;

enum LangEnum {
    NAME = 'name',
    ITEMS = 'items'
}

class CountriesParser {

    code: string;
    name: string;
    lang: {name?: string, items?: string}|null;
    zoom: number;
    warning: boolean;
    exceptions: [];
    folder: string;
    itemsFolder: string;
    path: string;
    config: Country;
    configMin: Country;

    constructor(item: any) {
        this.path = item.path;
        this.code = path.parse(this.path).name;
        this.name = item?.name ?? this.code;
        this.name = this.name.replaceAll('-', ' ');
        this.lang = item?.lang;
        this.zoom = item?.zoom ?? 2;
        this.folder = ROOT + `${this.code}/`;
        this.itemsFolder = this.folder + `items/`;
       
        this.exceptions = item?.exceptions ?? [];
        this.warning = item?.warning ?? true;
    }

    generateSvg(properties: any, svg_attr = ''){
        return `<svg xmlns="http://www.w3.org/2000/svg" ${svg_attr}>
            <path 
                d="${properties.d}" 
                fill="rgb(151, 144, 238)" 
                stroke="white" 
                stroke-width=".7px"
                title="${properties.title}" 
                id="${properties.id}" 
            />
        </svg>`;
    }

    firstLetterToUppercase(value: string) {
        return value[0].toUpperCase() + value.slice(1);
    }

    fixDash(value: string) {
        let newValue = value;
        newValue = newValue.replaceAll(' -', '-');
        newValue = newValue.replaceAll('- ', '-');
        return newValue;
    }

    fixCountryName(value: string) {
        let newValue = value;
        newValue = newValue.toLowerCase();
        newValue = this.firstLetterToUppercase(newValue);
        newValue = this.fixDash(newValue);
        return newValue;
    }

    async getLanguage(value: string, type: LangEnum): Promise<Language>
    {
        const res = {};
        const name = this.fixCountryName(value);
        const lang = this.checkLanguage(name, type);
        for(let i = 0; i < language.length; i++){
            const item = language[i];
            try {
                const translateName = lang === item.code ? value : await translate(value, { from: lang, to: item.code });
                res[item.code] = this.fixCountryName(translateName);
            } catch (error){
                console.error(`Fail translate: ${item.code}`, error);
                res[item.code] = name;
            }
        }
        return res as Language;
    }

    checkLanguage(value: string, type: LangEnum){
        if(type === LangEnum.NAME && this.lang?.name){
            return this.lang.name;
        }
        if(type === LangEnum.ITEMS && this.lang?.items){
            return this.lang.items;
        }
        const langs = lngDetector.detect(value, 1);
        if(langs && langs[0] && langs[0][0]){
            return langs[0][0];
        }
        return "en";
    }

    async parse(){
        const config = {
            name: await this.getLanguage(this.name, LangEnum.NAME),
            code: this.code,
            zoom: this.zoom,
            items: [],
        };
        this.config = deepClone(config);
        this.configMin = deepClone(config);
        await this.makeDir();
        const file = await readFile(this.path, 'utf8');
        const parsed = parse(file);

        if(!('children' in parsed.children[0])){
            throw new Error('Could not parse children');
        }

        const jobs: any[] = [];
        parsed.children[0].children.forEach((item: any) => {
            if(!('properties' in item)){
                throw new Error('Could not parse properties for the given properties.');
            }
            const properties: any = item.properties;
            if(
                properties.title === undefined || properties.id === undefined
            ){
                return;
            }
            if(this.exceptions.includes(properties.id as never)){
                return;
            }

            try {
                const rootSvg = SVG(this.generateSvg(properties));
                const box = rootSvg.bbox();
                if(box.width > 200 || box.width < 3 || box.height > 200 || box.height < 3){
                    this.warningSend('Warning size', properties, box);
                }
                if(box.x === 0 || box.y === 0) {
                    this.warningSend('Warning coordinate', properties, box);
                }
    
                jobs.push(this.createSvg(properties, box));
            } catch (error) {
                this.warningSend(`Error: ${error.message}`, properties);
            }
        });

        await Promise.all(jobs);

        await this.createConfig();
    }

    warningSend(text: string, properties: any, box: Box|object = {}){
        if(this.warning){
            const data = Object.assign({}, properties, box);
            // const dataText = '';
            const dataText = `Data: ` + JSON.stringify(data);
            console.warn(`${text}. Map: "${this.code}"; Code: "${properties.id}"; ${dataText}\n`);
        }
    }

    async makeDir(){
        await mkdir(this.folder);
        await mkdir(this.itemsFolder);
    }

    async createSvg(properties: any, {x, y, width, height}: Box){
        const viewBox = `${x} ${y} ${width} ${height}" width="${width}" height="${height}`;
        const content = this.generateSvg(properties, `viewBox="${viewBox}"`);

        const svgPath = this.itemsFolder +  `${properties.title}.svg`;

        this.config.items.push({
            name: await this.getLanguage(properties.title, LangEnum.ITEMS),
            code: properties.id,
            image: svgPath,
            width,
            height,
            coordinate: {x, y},
            zIndex: 1
        });

        await writeFile(svgPath, content);
    }

    createConfig(){
        return Promise.all([
            writeFile(this.folder + `config.json`, JSON.stringify(this.config)),
            writeFile(this.folder + `config.min.json`, JSON.stringify(this.configMin)),
        ]);
    }
}

const window = createSVGWindow();
const { document } = window;
registerWindow(window, document);

const lngDetector = new LanguageDetect();
lngDetector.setLanguageType('iso2');

console.log('Start work', new Date());

await rm(ROOT, { recursive: true, force: true });
await mkdir(ROOT);

const jobs: any[] = [];
files.forEach(item => {
    jobs.push(new CountriesParser(item).parse());
});

Promise.all(jobs).then(() => {
    console.log('Done', new Date());
});
