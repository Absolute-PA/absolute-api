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
var SoundService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path = require("path");
const event_emitter_1 = require("@nestjs/event-emitter");
const file_1 = require("@/common/file");
const agenda_service_1 = require("@/agenda/agenda.service");
const enums_1 = require("@/common/enums");
const constants_1 = require("@/common/constants");
const utils_1 = require("@/common/utils");
const path_1 = require("@/common/path");
const audio_player_1 = require("@/common/audio/audio-player");
const sound_1 = require("@/common/events/sound");
const job_1 = require("@/common/job");
const constants_2 = require("./constants");
const default_sounds_1 = require("./data/default-sounds");
const sound_gateway_1 = require("./sound.gateway");
const path_2 = require("path");
const upload_service_1 = require("../upload/upload.service");
const text_to_audio_service_1 = require("../text-to-audio/text-to-audio.service");
const streaming_service_1 = require("../streaming/streaming.service");
let SoundService = SoundService_1 = class SoundService {
    constructor(soundModel, agendaService, uploadService, textToAudioService, streamingService, soundGateway) {
        this.soundModel = soundModel;
        this.agendaService = agendaService;
        this.uploadService = uploadService;
        this.textToAudioService = textToAudioService;
        this.streamingService = streamingService;
        this.soundGateway = soundGateway;
        this.logger = new common_1.Logger(SoundService_1.name);
    }
    async create(createSoundDto) {
        await this.validateAndMoveFileAsync(createSoundDto, null);
        const newSound = new this.soundModel(createSoundDto);
        return newSound.save();
    }
    async findByType(type) {
        const sounds = await this.soundModel.find({ type }).exec();
        return sounds;
    }
    async findOne(id) {
        const sound = await this.soundModel.findById(id);
        return sound;
    }
    async findByIds(ids) {
        const sounds = await this.soundModel.find({ _id: { $in: ids } });
        return sounds;
    }
    async update(id, updateSoundDto) {
        const existingSound = await this.soundModel.findById(id).exec();
        if (!existingSound) {
            throw new Error('Sound not found!');
        }
        await this.validateAndMoveFileAsync(updateSoundDto, existingSound === null || existingSound === void 0 ? void 0 : existingSound.fileName);
        const sound = await this.soundModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateSoundDto), { updatedAtUtc: new Date() }), { new: true });
        return sound;
    }
    async updateVolume(id, updateSoundDto) {
        const existingSound = await this.soundModel.findById(id).exec();
        if (!existingSound) {
            throw new Error('Sound not found!');
        }
        const sound = await this.soundModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateSoundDto), { updatedAtUtc: new Date() }), { new: true });
        return sound;
    }
    async delete(id) {
        const sound = await this.soundModel.findByIdAndDelete(id);
        if (sound.fileName) {
            const soundPath = `${constants_1.AUDIO_DIR}/${sound.fileName}`;
            try {
                (0, file_1.deleteFile)(soundPath);
            }
            catch (e) {
                this.logger.error(e);
            }
        }
        return sound;
    }
    async upload(id, file) {
        const existingSound = await this.soundModel.findById(id).exec();
        const existingFileName = existingSound === null || existingSound === void 0 ? void 0 : existingSound.fileName;
        const fileName = this.getNewFileName(file.originalname);
        const soundPath = `${constants_1.AUDIO_DIR}/${fileName}`;
        await (0, file_1.moveFile)(file.path, soundPath);
        const updateSoundDto = {
            fileName,
        };
        const sound = await this.soundModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateSoundDto), { updatedAtUtc: new Date() }), { new: true });
        if (existingFileName) {
            const existingSoundPath = `${constants_1.AUDIO_DIR}/${existingFileName}`;
            (0, file_1.deleteFile)(existingSoundPath);
        }
        return sound;
    }
    async playSoundOnEvent(payload) {
        const { soundId, jobId, durationInSecond } = payload;
        const sound = await this.findOne(soundId);
        const soundPath = path.join(path_1.processRootPath, 'assets', 'audio', sound.fileName);
        if (!(0, file_1.isFileExist)(soundPath)) {
            this.logger.error(`Sound file not found: ${soundPath}`);
            return;
        }
        job_1.PROCESS_CACHE.killAll();
        this.logger.log(`Playing sound: ${soundId} - ${sound.name}`);
        (0, job_1.executeJob)({
            jobId,
            run: () => audio_player_1.AudioPlayer.playAsync(soundPath, sound.volume),
            next: () => this.stop(soundId),
            durationInSecond,
        });
        this.soundGateway.broadcastPlaying({ id: soundId, isPlaying: true });
    }
    async playVoiceRecorded(payload) {
        const { voiceId, jobId, durationInSecond } = payload;
        const voice = await this.uploadService.findVoiceRecoredById(voiceId);
        const filePath = voice.filePath;
        const fullFilePath = (0, path_2.join)(process.cwd(), filePath);
        if (!(0, file_1.isFileExist)(fullFilePath)) {
            this.logger.error(`Voice file not found: ${fullFilePath}`);
            return;
        }
        job_1.PROCESS_CACHE.killAll();
        this.logger.log(`Playing voice recorded: ${voiceId}`);
        (0, job_1.executeJob)({
            jobId,
            run: () => audio_player_1.AudioPlayer.playAsync(fullFilePath),
            durationInSecond,
            next: () => null,
        });
    }
    async playTextToAudioRecorded(payload) {
        const { textToAudioId, jobId, durationInSecond } = payload;
        const { message } = await this.textToAudioService.getMessageById(textToAudioId);
        job_1.PROCESS_CACHE.killAll();
        (0, job_1.executeJob)({
            jobId,
            run: () => {
                let result = null;
                this.textToAudioService.textToAudio(message, (stream) => {
                    result = this.streamingService.playStreamAudioAsync(stream);
                });
                return result;
            },
            durationInSecond,
            next: () => null,
        });
    }
    async play(actor, id, isRepeat = false) {
        const jobDto = {
            when: 'now',
            jobType: enums_1.JobType.PlaySound,
            attributes: {
                soundId: id,
                durationInSecond: isRepeat ? 86400 : undefined,
            },
            audit: {
                actor,
                name: enums_1.JobType.PlaySound,
                message: `Play sound: ${id}`,
            },
        };
        const playingSound = await this.soundModel.findOne({
            jobId: { $ne: null },
        });
        if (playingSound) {
            await this.stop(playingSound.id);
        }
        const { jobId } = await this.agendaService.scheduleJob(jobDto);
        return this.update(id, { jobId });
    }
    async stop(id) {
        let sound = await this.findOne(id);
        const { jobId } = sound || {};
        if (jobId) {
            const { success } = await this.agendaService.cancelJob(jobId);
            if (success) {
                sound = await this.update(id, { jobId: null });
            }
        }
        this.soundGateway.broadcastPlaying({
            id: sound.id,
            isPlaying: false,
        });
        return sound;
    }
    async resetTunes() {
        const tunes = await this.findByType(constants_2.SoundType.Tune);
        if (tunes.length > 0) {
            const deletingPromises = [];
            tunes.forEach((tune) => {
                deletingPromises.push(this.delete(tune._id));
            });
            await Promise.all(deletingPromises);
        }
        await (0, file_1.copyFiles)(constants_1.DEFAULT_TUNES_DIR, constants_1.TMP_UPLOAD_DIR);
        const creatingPromises = [];
        default_sounds_1.DEFAULT_TUNES.forEach((sound) => {
            creatingPromises.push(this.create(Object.assign({}, sound)));
        });
        await Promise.all(creatingPromises);
        return true;
    }
    getNewFileName(originalName) {
        const fileExt = originalName.split('.').pop();
        return `${(0, utils_1.uuid)()}.${fileExt}`;
    }
    async validateAndMoveFileAsync(dto, existingFileName) {
        if (!dto.fileName) {
            return;
        }
        const tempPath = `${constants_1.TMP_UPLOAD_DIR}/${dto.fileName}`;
        const destFileName = existingFileName || this.getNewFileName(dto.fileName);
        const soundPath = `${constants_1.AUDIO_DIR}/${destFileName}`;
        if (!(0, file_1.isFileExist)(tempPath)) {
            throw new Error('File not found!');
        }
        if (!(0, file_1.isFileExist)(constants_1.AUDIO_DIR)) {
            (0, file_1.createFolder)(constants_1.AUDIO_DIR);
        }
        await (0, file_1.moveFile)(tempPath, soundPath);
        dto.fileName = destFileName;
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(sound_1.SoundEvent.Play),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SoundService.prototype, "playSoundOnEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(sound_1.SoundEvent.VoiceRecorded),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SoundService.prototype, "playVoiceRecorded", null);
__decorate([
    (0, event_emitter_1.OnEvent)(sound_1.SoundEvent.TextToAudio),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SoundService.prototype, "playTextToAudioRecorded", null);
SoundService = SoundService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Sound')),
    __param(5, (0, common_1.Inject)(sound_gateway_1.SoundGateway)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        agenda_service_1.AgendaService,
        upload_service_1.UploadService,
        text_to_audio_service_1.TextToAudioService,
        streaming_service_1.StreamingService,
        sound_gateway_1.SoundGateway])
], SoundService);
exports.SoundService = SoundService;
//# sourceMappingURL=sound.service.js.map