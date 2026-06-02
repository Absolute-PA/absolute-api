/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from 'child_process';
declare class ProcessCache {
    private processMap;
    addProcess(id: string, process: ChildProcessWithoutNullStreams): void;
    getProcess(id: string): ChildProcessWithoutNullStreams;
    killProcess(id: string): void;
    killAll(): void;
    killAllAndWait(timeoutMs?: number): Promise<void>;
}
export declare const PROCESS_CACHE: ProcessCache;
export {};
