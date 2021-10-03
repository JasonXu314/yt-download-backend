import { DownloadDto } from 'src/DownloadDto';
import { chooseFormat, downloadOptions } from 'ytdl-core';

export function makeOptions(dto: DownloadDto, videoInfo: VideoInfo): downloadOptions {
	const options: downloadOptions = {};

	options.format = chooseFormat(
		videoInfo.formats.filter((format) => {
			if (dto.format === 'mp4' && (!format.hasVideo || !format.hasAudio)) {
				return false;
			}
			if (dto.format === 'mp3' && !format.hasAudio) {
				return false;
			}

			if (format.container !== dto.format) {
				return false;
			}

			return true;
		}),
		{ quality: dto.quality }
	);

	console.log(options.format);

	return options;
}
