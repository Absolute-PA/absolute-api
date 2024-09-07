export declare enum PlaylistEvent {
    Play = "playlist.play"
}
export interface PlaylistEventPlayPayload {
    jobId: string;
    playlistId: string;
    durationInSecond?: number;
}
