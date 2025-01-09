import { parse } from 'svg-parser';
import fs from 'node:fs';
import { registerWindow, SVG } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';

class CountriesParser {

    constructor({code, name}) {
        const ROOT = `./src/countries/`;
        this.folder = ROOT + `${code}/`;
        this.itemsFolder = this.folder + `items/`;
        this.path = ROOT + `${code}.svg`;

        this.config = {
            name,
            code,
            items: [],
        };
    }

    generateSvg(properties, svg_attr = ''){
        return `<svg xmlns="http://www.w3.org/2000/svg" ${svg_attr}><path d="${properties.d}" fill="white" stroke="black" title="${properties.title}" id="${properties.id}" /></svg>`;
    }

    async parse(){
        await this.makeDir();
        const file = await fs.promises.readFile(this.path, 'utf8');
        const parsed = parse(file);

        parsed.children[0].children.forEach(({properties}) => {
            if(properties.title === undefined){
                return;
            }

            this.createSvg(properties);
        });

        await this.createConfig();
    }

    async makeDir(){
        await fs.promises.rm(this.folder, { recursive: true, force: true });
        await fs.promises.mkdir(this.folder);
        await fs.promises.mkdir(this.itemsFolder);
    }

    createSvg(properties){
        const rootSvg = SVG(this.generateSvg(properties));
        const box = rootSvg.bbox();
        const content = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>`
            + this.generateSvg(properties, `viewBox="${box.x} ${box.y} ${box.width} ${box.height}" width="${box.width}" height="${box.height}"`);

        const svgPath = this.itemsFolder +  `${properties.title}.svg`;

        this.config.items.push({
            name: properties.title,
            code: properties.id,
            image: svgPath,
            width: box.width,
            height: box.height,
            coordinate: {
                x: 1,
                y: 1,
            }
        });

        return fs.promises.writeFile(svgPath, content);
    }

    createConfig(){
        return fs.promises.writeFile(this.folder + `config.json`, JSON.stringify(this.config));
    }
}

const window = createSVGWindow();
const { document } = window;
registerWindow(window, document);

const countries = [
    // {code: 'world', name: 'Мир'},
    {code: 'africa', name: "Африка"},
];

const jobs = countries.map(p => {
    const item = new CountriesParser(p);
    return item.parse;
});

console.log('Start work');
Promise.all(jobs).then(() => {
    console.log('Done!');
});
