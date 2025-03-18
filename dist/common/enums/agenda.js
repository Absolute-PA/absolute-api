"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundJobType = exports.JobType = void 0;
var JobType;
(function (JobType) {
    JobType["PlaySound"] = "PlaySound";
    JobType["PlayMusic"] = "PlayMusic";
    JobType["PlayVoiceRecorded"] = "PlayVoiceRecorded";
    JobType["PlayTextToAudio"] = "PlayTextToAudio";
})(JobType = exports.JobType || (exports.JobType = {}));
var BackgroundJobType;
(function (BackgroundJobType) {
    BackgroundJobType["CheckEvent"] = "CheckEvent";
    BackgroundJobType["PurgeTempUploadedFiles"] = "PurgeTempUploadedFiles";
})(BackgroundJobType = exports.BackgroundJobType || (exports.BackgroundJobType = {}));
//# sourceMappingURL=agenda.js.map