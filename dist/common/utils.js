"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.detectOs = exports.isRaspberryPi = void 0;
const fs = require("fs");
const os = require("os");
function isRaspberryPi() {
    try {
        const cpuInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
        return cpuInfo.includes('BCM');
    }
    catch (error) {
        return false;
    }
}
exports.isRaspberryPi = isRaspberryPi;
function detectOs() {
    const platform = os.platform();
    if (platform === 'win32') {
        return 'Windows';
    }
    else if (platform === 'linux') {
        return 'Linux';
    }
    else if (platform === 'darwin') {
        return 'macOS';
    }
    else {
        return 'Unknown';
    }
}
exports.detectOs = detectOs;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuid = uuid;
//# sourceMappingURL=utils.js.map