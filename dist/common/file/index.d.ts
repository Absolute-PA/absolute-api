export declare const moveFile: (sourcePath: string, destinationPath: string) => Promise<void>;
export declare const deleteFile: (filePath: string) => void;
export declare const deleteFilesInFolder: (folderPath: string) => Promise<{
    success: boolean;
    message?: string;
}>;
export declare const isFileExist: (filePath: string) => boolean;
export declare const copyFiles: (sourceDir: string, destinationDir: string) => Promise<void>;
export declare const createFolder: (filePath: string) => Promise<void>;
