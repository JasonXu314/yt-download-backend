import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DownloadDto } from 'src/DownloadDto';
import { downloadOptions, videoFormat } from 'ytdl-core';

export const QUALITY_OPTIONS = [
	'144p',
	'144p 15fps',
	'144p60 HDR',
	'240p',
	'240p60 HDR',
	'270p',
	'360p',
	'360p60 HDR',
	'480p',
	'480p60 HDR',
	'720p',
	'720p60',
	'720p60 HDR',
	'1080p',
	'1080p60',
	'1080p60 HDR',
	'1440p',
	'1440p60',
	'1440p60 HDR',
	'2160p',
	'2160p60',
	'2160p60 HDR',
	'4320p',
	'4320p60'
] as DownloadQuality[];

export function makeOptions(dto: DownloadDto, videoInfo: VideoInfo): downloadOptions {
	const options: downloadOptions = {};

	const matchingFormats = videoInfo.formats.filter((format) => {
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
	});

	console.log(matchingFormats.length);

	options.format = selectFormat(matchingFormats, dto.quality);

	console.log(options.format);

	return options;
}

function selectFormat(formats: videoFormat[], targetQuality: DownloadQuality): videoFormat {
	let quality = targetQuality;
	let format: videoFormat;

	while (!(format = formats.find((format) => format.qualityLabel === quality))) {
		try {
			quality = upQuality(quality);
		} catch (e) {
			break;
		}
	}

	if (format) {
		return format;
	}

	quality = targetQuality;
	while (!(format = formats.find((format) => format.qualityLabel === quality))) {
		try {
			quality = downQuality(quality);
		} catch (e) {
			break;
		}
	}

	if (format) {
		return format;
	} else {
		throw new InternalServerErrorException('No available formats found for download');
	}
}

function upQuality(quality: DownloadQuality): DownloadQuality {
	const idx = QUALITY_OPTIONS.findIndex((q) => q === quality);

	if (idx === -1) {
		throw new BadRequestException('Quality option not found');
	}
	if (idx === QUALITY_OPTIONS.length - 1) {
		throw new Error('No higher quality');
	}

	return QUALITY_OPTIONS[idx + 1];
}

function downQuality(quality: DownloadQuality): DownloadQuality {
	const idx = QUALITY_OPTIONS.findIndex((q) => q === quality);

	if (idx === -1) {
		throw new BadRequestException('Quality option not found');
	}
	if (idx === 0) {
		throw new Error('No lower quality');
	}

	return QUALITY_OPTIONS[idx - 1];
}
