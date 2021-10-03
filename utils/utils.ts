import { DownloadDto } from 'src/DownloadDto';
import { downloadOptions } from 'ytdl-core';

export function makeOptions(dto: DownloadDto): downloadOptions {
	const options: downloadOptions = {};

	options.filter = dto.format === 'mp3' ? 'audioonly' : 'audioandvideo';
	options.quality = dto.quality;

	return options;
}
