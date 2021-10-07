type Readable = import('stream').Readable;
type VideoInfo = import('ytdl-core').videoInfo;

type DownloadFormat = 'mp4' | 'mp3';
type DownloadQuality =
	| '144p'
	| '144p 15fps'
	| '144p60 HDR'
	| '240p'
	| '240p60 HDR'
	| '270p'
	| '360p'
	| '360p60 HDR'
	| '480p'
	| '480p60 HDR'
	| '720p'
	| '720p60'
	| '720p60 HDR'
	| '1080p'
	| '1080p60'
	| '1080p60 HDR'
	| '1440p'
	| '1440p60'
	| '1440p60 HDR'
	| '2160p'
	| '2160p60'
	| '2160p60 HDR'
	| '4320p'
	| '4320p60';

type DownloadResult = {
	info: VideoInfo;
	stream: Readable;
};
