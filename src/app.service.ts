import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { downloadOptions } from 'ytdl-core';

@Injectable()
export class AppService {
	async download(url: string, options?: downloadOptions): Promise<DownloadResult> {
		return {
			info: await ytdl.getInfo(url),
			stream: ytdl(url, options)
		};
	}
}
