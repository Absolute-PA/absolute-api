"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findExec = require("find-exec");
const child_process_1 = require("child_process");
const players = [
    'mplayer',
    'mpg321',
    'play',
    'omxplayer',
    'aplay',
    'cmdmp3',
    'cvlc',
    'powershell',
    'vlc',
];
class Player {
    constructor(opts = {}, logger) {
        this.opts = opts;
        this.logger = logger;
        this.players = this.opts.players || players;
        this.player = this.opts.player || findExec(this.players);
    }
    play(what, options, next = (error) => null) {
        var _a, _b, _c, _d, _e;
        next = typeof options === 'function' ? options : next;
        options = typeof options === 'object' ? options : {};
        if (!what)
            return next(new Error('No audio file specified'));
        if (!this.player) {
            return next(new Error("Couldn't find a suitable audio player"));
        }
        this.logger.log('Player is ' + this.player);
        const args = Array.isArray(options[this.player])
            ? options[this.player].concat(what)
            : [what];
        this.logger.log('Playing Args: ' + args.join(' '));
        const process = (0, child_process_1.spawn)(this.player, args, options);
        if (!process) {
            next(new Error('Unable to spawn process with ' + this.player));
            return null;
        }
        try {
            process.on('close', function (err) {
                next(err ? err : null);
            });
            process.on('error', (error) => {
                this.logger.error(error);
            });
            (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            });
            (_b = process.stdout) === null || _b === void 0 ? void 0 : _b.on('error', (err) => {
                this.logger.log(err);
            });
            (_c = process.stderr) === null || _c === void 0 ? void 0 : _c.on('error', (error) => {
                this.logger.log(error);
            });
            (_d = process.stderr) === null || _d === void 0 ? void 0 : _d.on('data', (data) => {
                this.logger.log('stderr data: ' + data);
            });
            (_e = process.stdin) === null || _e === void 0 ? void 0 : _e.on('error', (error) => {
                this.logger.log(error);
            });
            process === null || process === void 0 ? void 0 : process.on('exit', (code) => {
                process.kill();
                if (code !== 0) {
                    this.logger.log('grep process exited with code ' + code);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
        return process;
    }
}
exports.default = Player;
//# sourceMappingURL=player.js.map