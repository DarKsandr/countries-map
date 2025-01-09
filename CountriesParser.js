import { parse } from 'svg-parser';
import fs from 'node:fs';
import minimist from 'minimist';

const ROOT = `./src/countries/`;

async function parseFile({code, name}, options) {

    const folder = ROOT + `${code}/`;
    const itemsFolder = folder + `items/`;

    await fs.promises.rm(folder, { recursive: true, force: true });
    await fs.promises.mkdir(folder);
    await fs.promises.mkdir(itemsFolder);

    const path = ROOT + `${code}.svg`;

    const config = {
        name,
        code,
        items: [],
    };

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        const parsed = parse(data);
        parsed.children[0].children.forEach(({properties}) => {
            if(properties.title === undefined){
                return;
            }
            const content = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg xmlns="http://www.w3.org/2000/svg">
            <path
                d="${properties.d}"
                fill="white"
                stroke="black"
                title="${properties.title}"
                id="${properties.id}" />
        </svg>`;

            const svgPath = itemsFolder +  `${properties.title}.svg`;

            fs.writeFile(svgPath, content, err => {
                if(err){
                    throw err;
                }
            });

            config.items.push({
                name: properties.title,
                code: properties.id,
                image: svgPath,
                coordinate: {
                    x: 1,
                    y: 1,
                }
            });
        });

        if(!options?.withoutConfig){
            fs.writeFile(folder + `config.json`, JSON.stringify(config), err => {
                if(err){
                    throw err;
                }
            });
        }
    });
}

const argv = minimist(process.argv);

[
    {code: 'world', name: 'Мир'},
    {code: 'africa', name: "Африка"},
].forEach(p => parseFile(p, {
    withoutConfig: argv?.withoutConfig ?? false
}));

