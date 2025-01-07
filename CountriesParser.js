import { parse } from 'svg-parser';
import fs from 'node:fs';

const ROOT = `./src/countries/`;

function parseFile(name) {

    const folderName = ROOT + `${name}/items/`;

    fs.rm(folderName, { recursive: true, force: true }, (err) => {
        if (err) throw err;
        fs.mkdirSync(folderName);
    });

    const path = ROOT + `${name}/${name}.svg`;

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        const parsed = parse(data);
        parsed.children[0].children.forEach(({properties}) => {
            const content = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg xmlns="http://www.w3.org/2000/svg">
            <path
                d="${properties.d}"
                fill="white"
                stroke="black"
                title="${properties.title}"
                id="${properties.id}" />
        </svg>`;

            fs.writeFile(folderName +  `/${properties.title}.svg`, content, err => {
                if(err){
                    throw err;
                }
            });
        });
    });
}

[
    'world',
    'africa',
].forEach(p => parseFile(p));

