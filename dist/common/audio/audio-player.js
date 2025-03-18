"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = void 0;
const common_1 = require("@nestjs/common");
const player_1 = require("./player");
class AudioPlayer {
    static play(audioPath, volume) {
        this.logger.log(`Playing sounds`);
        try {
            this.player.play(audioPath, {
                afplay: volume ? ['-v', volume] : [],
                mplayer: volume ? ['-volume', volume, '-novideo'] : [],
            }, (err) => {
                if (err !== 1) {
                    this.logger.log(`Error playing sound: ${err}`);
                }
            });
        }
        catch (error) {
            this.logger.log(`Error playing sound: ${error}`);
        }
    }
    static playAsync(audioPath, volume, shuffle) {
        let process;
        const getMplayerOptions = () => {
            const options = ['-novideo'];
            if (typeof volume === 'number' && volume >= 0) {
                options.push('-volume', volume.toString());
            }
            if (shuffle) {
                options.push('-shuffle');
            }
            return options;
        };
        const promise = new Promise((resolve, reject) => {
            this.logger.log(`Playing sounds`);
            process = this.player.play(audioPath, {
                afplay: volume ? ['-v', volume] : [],
                mplayer: getMplayerOptions(),
            }, (err) => {
                if (err && err !== 1) {
                    this.logger.log(`Error playing sound: ${err}`);
                    return reject(false);
                }
                resolve(true);
            });
        });
        return { process, promise };
    }
}
exports.AudioPlayer = AudioPlayer;
_a = AudioPlayer;
AudioPlayer.logger = new common_1.Logger(AudioPlayer.name);
AudioPlayer.player = new player_1.default({}, _a.logger);
//# sourceMappingURL=audio-player.js.map