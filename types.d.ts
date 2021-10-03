type Readable = import('stream').Readable;
type VideoInfo = import('ytdl-core').videoInfo;

type DownloadFormat = 'mp4' | 'mp3';
type DownloadQuality = 'highest' | 'lowest' | 'highestaudio' | 'lowestaudio' | 'highestvideo' | 'lowestvideo';

type DownloadResult = {
	info: VideoInfo;
	stream: Readable;
};
