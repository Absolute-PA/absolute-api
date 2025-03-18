"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldRunJob = void 0;
const shouldRunJob = async (job) => {
    const current = new Date();
    if (job.attrs.startDate && job.attrs.startDate > current) {
        job.attrs.nextRunAt = new Date(job.attrs.startDate);
        job.save();
        return false;
    }
    if (job.attrs.endDate && job.attrs.endDate < current) {
        await job.remove();
        return false;
    }
    return true;
};
exports.shouldRunJob = shouldRunJob;
//# sourceMappingURL=job-validator.js.map