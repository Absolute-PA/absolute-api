"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
const CryptoJS = require("crypto-js");
const decrypt = (encryptedMessage, secretKey) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const decryptedMessage = JSON.parse(decryptedString);
    return decryptedMessage;
};
exports.decrypt = decrypt;
//# sourceMappingURL=decrypt.js.map