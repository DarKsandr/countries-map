import { parse } from 'svg-parser';
import {rm, mkdir, writeFile, readFile} from 'fs/promises';
import {Box, registerWindow, SVG} from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import type Country from "./src/interfaces/Country";
import translate from "translate";
import type Language from "./src/interfaces/Language";

const ROOT = `./src/countries/`;

class CountriesParser {

    code: string;
    folder: string;
    itemsFolder: string;
    path: string;
    config: Country;

    constructor(code: string) {
        this.folder = ROOT + `${code}/`;
        this.itemsFolder = this.folder + `items/`;
        this.path = ROOT + `${code}.svg`;
        this.code = code;
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

    async getLanguage(value: string): Promise<Language>
    {
        return {
            en: this.firstLetterToUppercase(value),
            ru: this.firstLetterToUppercase(await translate(value, 'ru')),
        }
    }

    async parse(){
        this.config = {
            name: await this.getLanguage(this.code),
            code: this.code,
            items: [],
        };
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
            const properties = item.properties;
            if(properties.title === undefined || properties.id === undefined){
                return;
            }

            const rootSvg = SVG(this.generateSvg(properties));
            const box = rootSvg.bbox();
            if(box.width > 200 || box.width < 3 || box.height > 200 || box.height < 3){
                console.warn(`Skip country: ${properties.title}; size: [width: ${box.width}, height: ${box.height}]`);
                return;
            }
            if(box.x === 0 || box.y === 0) {
                console.warn(`Skip country: ${properties.title}; coordinate: [x: ${box.x}, y: ${box.y}]`);
                return;
            }

            jobs.push(this.createSvg(properties, box));
        });

        await Promise.all(jobs);

        await this.createConfig();
    }

    async makeDir(){
        await rm(this.folder, { recursive: true, force: true });
        await mkdir(this.folder);
        await mkdir(this.itemsFolder);
    }

    async createSvg(properties: any, {x, y, width, height}: Box){
        const viewBox = `${x} ${y} ${width} ${height}" width="${width}" height="${height}`;
        const content = this.generateSvg(properties, `viewBox="${viewBox}"`);

        const svgPath = this.itemsFolder +  `${properties.title}.svg`;

        this.config.items.push({
            name: await this.getLanguage(properties.title),
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
        return writeFile(this.folder + `config.json`, JSON.stringify(this.config));
    }
}

const window = createSVGWindow();
const { document } = window;
registerWindow(window, document);

console.log('Start work', new Date());

const files = [
    'africa',
];

const jobs: any[] = [];
files.forEach(code => {
    jobs.push(new CountriesParser(code).parse());
});

Promise.all(jobs).then(() => {
    console.log('Done', new Date());
});
