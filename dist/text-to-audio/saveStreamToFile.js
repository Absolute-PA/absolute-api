"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStreamToFile = void 0;
const fs = require("fs");
async function saveStreamToFile(stream, output) {
    const outputStream = fs.createWriteStream(output);
    stream.pipe(outputStream);
    return new Promise((resolve, reject) => {
        outputStream.on('finish', () => {
            console.log('Stream has been written to the file successfully.');
            resolve(output);
        });
        outputStream.on('error', (err) => {
            console.error('Error writing stream to file:', err);
            reject(err);
        });
    });
}
exports.saveStreamToFile = saveStreamToFile;
//# sourceMappingURL=saveStreamToFile.js.map