"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.hash = void 0;
const crypto = require("crypto");
async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err)
                reject(err);
            resolve(salt + ':' + derivedKey.toString('hex'));
        });
    });
}
exports.hash = hash;
async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err)
                reject(err);
            resolve(key == derivedKey.toString('hex'));
        });
    });
}
exports.verify = verify;
//# sourceMappingURL=verify.js.map