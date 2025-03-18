"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TUNES = void 0;
const constants_1 = require("../constants");
exports.DEFAULT_TUNES = [
    {
        name: 'Bell',
        type: constants_1.SoundType.Tune,
        fileName: 'bell.mp3',
        isDefault: true,
        volume: 50,
    },
    {
        name: 'Evac',
        type: constants_1.SoundType.Tune,
        fileName: 'evac.mp3',
        isDefault: true,
        volume: 50,
    },
    {
        name: 'Alert',
        type: constants_1.SoundType.Tune,
        fileName: 'alert.mp3',
        isDefault: true,
        volume: 50,
    },
    {
        name: 'Lockdown',
        type: constants_1.SoundType.Tune,
        fileName: 'lockdown.mp3',
        isDefault: true,
        volume: 50,
    },
    {
        name: 'Chime',
        type: constants_1.SoundType.Tune,
        fileName: 'announcement.wav',
        isDefault: true,
        volume: 50,
    },
    {
        name: 'Custom Tune 1',
        type: constants_1.SoundType.Tune,
        fileName: null,
        isDefault: false,
        volume: 50,
    },
    {
        name: 'Custom Tune 2',
        type: constants_1.SoundType.Tune,
        fileName: null,
        isDefault: false,
        volume: 50,
    },
];
//# sourceMappingURL=default-sounds.js.map