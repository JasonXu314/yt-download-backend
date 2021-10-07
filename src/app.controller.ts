import { BadRequestException, Controller, Get, Query, Response, UsePipes, ValidationPipe } from '@nestjs/common';
import * as contentDisposition from 'content-disposition';
import { Response as Res } from 'express';
import { makeOptions } from 'utils/utils';
import { AppService } from './app.service';
import { DownloadDto } from './DownloadDto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
	async download(@Query() query: DownloadDto, @Response() res: Res): Promise<void> {
		if (!query.url && !query.id) {
			throw new BadRequestException('Either url or id must be present');
		}

		const url = query.url || query.id;

		const videoInfo = await this.appService.lookup(url);
		const video = this.appService.download(url, makeOptions(query, videoInfo));

		res.setHeader('Content-Disposition', contentDisposition(`${videoInfo.videoDetails.title}.${query.format}`));
		res.setHeader('Content-Type', query.format === 'mp3' ? 'audio/mpeg' : 'video/mp4');
		video.pipe(res);
	}

	@Get('/info')
	async info(@Query() query: { url?: string; id?: string }): Promise<VideoInfo> {
		if (!query.url && !query.id) {
			throw new BadRequestException('Either url or id must be present');
		}

		const url = query.url || query.id;

		return this.appService.lookup(url);
	}
}
