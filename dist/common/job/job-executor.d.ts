/// <reference types="node" />
/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from 'child_process';
export declare const executeJob: ({ jobId, run, next, durationInSecond, }: {
    jobId: string;
    run: () => {
        process: ChildProcessWithoutNullStreams;
        promise: Promise<boolean>;
    };
    next: (process: ChildProcessWithoutNullStreams, result: boolean) => void;
    durationInSecond?: number;
}) => Promise<void>;
