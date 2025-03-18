"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToDto = void 0;
const mapToDto = (playlist, sounds) => {
    return {
        _id: playlist._id,
        name: playlist.name,
        sounds: [...sounds],
        isShuffle: playlist.isShuffle,
        jobId: playlist.jobId,
        createdAtUtc: playlist.createdAtUtc,
        updatedAtUtc: playlist.updatedAtUtc,
    };
};
exports.mapToDto = mapToDto;
//# sourceMappingURL=playlist.mapper.js.map