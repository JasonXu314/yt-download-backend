import { IsIn, IsOptional, IsUrl, Validate } from 'class-validator';
import { QUALITY_OPTIONS } from 'utils/utils';
import { YoutubeIDValidator } from './YoutubeIDValidator';

export class DownloadDto {
	@IsUrl({ host_whitelist: ['youtube.com', 'www.youtube.com'], protocols: ['https', 'http'] })
	@IsOptional()
	url?: string;

	@Validate(YoutubeIDValidator)
	@IsOptional()
	id?: string;

	@IsIn(['mp4', 'mp3'])
	format: DownloadFormat;

	@IsIn(QUALITY_OPTIONS)
	@IsOptional()
	quality: DownloadQuality;
}
