"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = exports.copyFiles = exports.isFileExist = exports.deleteFilesInFolder = exports.deleteFile = exports.moveFile = void 0;
const fs_1 = require("fs");
const path = require("path");
const moveFile = async (sourcePath, destinationPath) => {
    try {
        await fs_1.promises.access(sourcePath);
        await fs_1.promises.rename(sourcePath, `${destinationPath}`);
    }
    catch (error) {
        throw new Error(`Failed to move and rename file: ${error.message}`);
    }
};
exports.moveFile = moveFile;
const deleteFile = (filePath) => {
    try {
        (0, fs_1.unlinkSync)(filePath);
    }
    catch (error) {
        throw new Error(`Failed to delete file: ${error.message}`);
    }
};
exports.deleteFile = deleteFile;
const deleteFilesInFolder = async (folderPath) => {
    try {
        const files = await fs_1.promises.readdir(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            await fs_1.promises.unlink(filePath);
        }
        return { success: true };
    }
    catch (error) {
        console.error('Error while deleting files:', error);
        return {
            success: false,
            message: error.message,
        };
    }
};
exports.deleteFilesInFolder = deleteFilesInFolder;
const isFileExist = (filePath) => {
    return (0, fs_1.existsSync)(filePath);
};
exports.isFileExist = isFileExist;
const copyFiles = async (sourceDir, destinationDir) => {
    try {
        const files = await fs_1.promises.readdir(sourceDir);
        for (const file of files) {
            const sourceFilePath = path.join(sourceDir, file);
            const destinationFilePath = path.join(destinationDir, file);
            await fs_1.promises.copyFile(sourceFilePath, destinationFilePath);
            console.log(`${file} copied successfully.`);
        }
    }
    catch (err) {
        console.error('Error copying files:', err);
    }
};
exports.copyFiles = copyFiles;
const createFolder = async (filePath) => {
    if (!(0, fs_1.existsSync)(filePath)) {
        (0, fs_1.mkdir)(filePath, { recursive: true }, (err) => {
            if (err)
                throw err;
            console.log('New folder created successfully!');
        });
    }
    else {
        console.log('The folder already exists.');
    }
};
exports.createFolder = createFolder;
//# sourceMappingURL=index.js.map