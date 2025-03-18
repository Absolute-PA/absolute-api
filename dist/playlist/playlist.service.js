"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlaylistService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const sound_service_1 = require("@/sound/sound.service");
const job_1 = require("@/common/job");
const events_1 = require("@/common/events");
const agenda_service_1 = require("@/agenda/agenda.service");
const playlist_mapper_1 = require("./mapper/playlist.mapper");
const enums_1 = require("../common/enums");
const path = require("path");
const path_1 = require("../common/path");
const audio_player_1 = require("../common/audio/audio-player");
const sound_gateway_1 = require("../sound/sound.gateway");
let PlaylistService = PlaylistService_1 = class PlaylistService {
    constructor(playlistModel, soundService, agendaService, soundGateway) {
        this.playlistModel = playlistModel;
        this.soundService = soundService;
        this.agendaService = agendaService;
        this.soundGateway = soundGateway;
        this.logger = new common_1.Logger(PlaylistService_1.name);
    }
    async create(createPlaylistDto) {
        const newPlaylist = new this.playlistModel(createPlaylistDto);
        return newPlaylist.save();
    }
    async findAll() {
        const playlists = await this.playlistModel.find().exec();
        const promises = playlists.map(async (playlist) => {
            const sounds = await this.soundService.findByIds(playlist.soundIds);
            return (0, playlist_mapper_1.mapToDto)(playlist, sounds);
        });
        return await Promise.all(promises);
    }
    async findOne(id) {
        const playlist = await this.playlistModel.findById(id);
        const sounds = await this.soundService.findByIds(playlist.soundIds);
        return (0, playlist_mapper_1.mapToDto)(playlist, sounds);
    }
    async update(id, updateDto) {
        const playlist = await this.playlistModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateDto), { updatedAtUtc: new Date() }), { new: true });
        const sounds = await this.soundService.findByIds(playlist.soundIds);
        return (0, playlist_mapper_1.mapToDto)(playlist, sounds);
    }
    async delete(id) {
        return await this.playlistModel.findByIdAndDelete(id);
    }
    async addSong(id, songId) {
        const playlist = await this.playlistModel.findById(id);
        playlist.soundIds.push(songId);
        return await playlist.save();
    }
    async removeSong(id, songId) {
        const playlist = await this.playlistModel.findById(id);
        playlist.soundIds = playlist.soundIds.filter((id) => id !== songId);
        return await playlist.save();
    }
    async play(actor, id) {
        const jobDto = {
            when: 'now',
            jobType: enums_1.JobType.PlayMusic,
            attributes: {
                playlistId: id,
            },
            audit: {
                actor,
                name: enums_1.JobType.PlayMusic,
                message: `Play Music Playlist: ${id}`,
            },
        };
        const { jobId } = await this.agendaService.scheduleJob(jobDto);
        return this.update(id, { jobId });
    }
    async stop(id) {
        let playlist = await this.findOne(id);
        const { jobId } = playlist || {};
        if (jobId) {
            const { success } = await this.agendaService.cancelJob(jobId);
            if (success) {
                playlist = await this.update(id, { jobId: null });
            }
        }
        this.soundGateway.broadcastPlaying({
            id: playlist._id,
            isPlaying: false,
        });
        return playlist;
    }
    async playFromEvent(payload) {
        const { playlistId, jobId, durationInSecond } = payload;
        const playlist = await this.playlistModel.findById(playlistId);
        const soundIds = [...playlist.soundIds];
        const songs = await this.soundService.findByIds(soundIds);
        const paths = songs.map((song) => path.join(path_1.processRootPath, 'assets', 'audio', song.fileName));
        job_1.PROCESS_CACHE.killAll();
        this.logger.log(`Playing playlist: ${playlistId} - ${playlist.name}`);
        (0, job_1.executeJob)({
            jobId,
            run: () => audio_player_1.AudioPlayer.playAsync(paths, 50, playlist.isShuffle),
            durationInSecond,
            next: () => this.stop(playlistId),
        });
        this.soundGateway.broadcastPlaying({ id: playlistId, isPlaying: true });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.PlaylistEvent.Play),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlaylistService.prototype, "playFromEvent", null);
PlaylistService = PlaylistService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Playlist')),
    __param(3, (0, common_1.Inject)(sound_gateway_1.SoundGateway)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        sound_service_1.SoundService,
        agenda_service_1.AgendaService,
        sound_gateway_1.SoundGateway])
], PlaylistService);
exports.PlaylistService = PlaylistService;
//# sourceMappingURL=playlist.service.js.map