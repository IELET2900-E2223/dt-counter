import * as fs from 'fs';
import { extname, join, parse,  } from 'path';

const ENTRY = '/home/k0rrupt/ncs/zephyr/boards';

let num = 0;

// Count as def. if folder name is the same
// as filename.
function traverse(target: fs.PathLike): void {
    const parent_name = (<string>target).split('/').pop();

    const folder = fs.readdirSync(target);

    for (const file of folder) {
        const path = join(<string>target, file);
        const stat = fs.lstatSync(path);
        
        if (stat.isDirectory()) {
            traverse(path);
        }

        if (stat.isFile() && extname(path) === '.dts' && parse(file).name === parent_name) {
            num++;
        }

    }
}

traverse(ENTRY);
console.log(num);
