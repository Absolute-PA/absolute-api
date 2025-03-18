"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScheduleJobDTO = exports.isRepeatJobDTO = void 0;
const isRepeatJobDTO = (job) => {
    return job.every !== undefined;
};
exports.isRepeatJobDTO = isRepeatJobDTO;
const isScheduleJobDTO = (job) => {
    return job.when !== undefined;
};
exports.isScheduleJobDTO = isScheduleJobDTO;
//# sourceMappingURL=job.dto.js.map