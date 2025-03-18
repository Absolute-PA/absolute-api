"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeJob = void 0;
const dayjs = require("dayjs");
const cache_1 = require("./cache");
const executeJob = async ({ jobId, run, next, durationInSecond, }) => {
    if (!durationInSecond) {
        const { process, promise } = run();
        cache_1.PROCESS_CACHE.addProcess(jobId, process);
        const result = await promise;
        next(process, result);
    }
    else {
        const time = dayjs().add(durationInSecond, 'second').toDate();
        setTimeout(async () => {
            cache_1.PROCESS_CACHE.killProcess(jobId);
        }, durationInSecond * 1000);
        while (dayjs().isBefore(time)) {
            const { process, promise } = run();
            cache_1.PROCESS_CACHE.addProcess(jobId, process);
            try {
                await promise;
                if (!cache_1.PROCESS_CACHE.getProcess(jobId)) {
                    next(process, true);
                    break;
                }
            }
            catch (e) {
                if (!cache_1.PROCESS_CACHE.getProcess(jobId)) {
                    next(process, true);
                    break;
                }
                console.error(`Error repeating process: ${e}`);
                next(process, false);
                break;
            }
        }
    }
};
exports.executeJob = executeJob;
//# sourceMappingURL=job-executor.js.map