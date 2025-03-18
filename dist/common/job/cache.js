"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROCESS_CACHE = void 0;
class ProcessCache {
    constructor() {
        this.processMap = {};
    }
    addProcess(id, process) {
        this.processMap[id] = process;
    }
    getProcess(id) {
        return this.processMap[id];
    }
    killProcess(id) {
        if (this.processMap[id]) {
            this.processMap[id].kill();
            delete this.processMap[id];
        }
    }
    killAll() {
        Object.keys(this.processMap).forEach((key) => {
            this.processMap[key].kill();
        });
        this.processMap = {};
    }
}
exports.PROCESS_CACHE = new ProcessCache();
//# sourceMappingURL=cache.js.map