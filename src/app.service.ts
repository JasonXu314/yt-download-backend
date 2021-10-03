import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { downloadOptions } from 'ytdl-core';

@Injectable()
export class AppService {
	download(url: string, options?: downloadOptions): Readable {
		return ytdl(url, options);
	}

	async lookup(url: string): Promise<VideoInfo> {
		return ytdl.getInfo(url);
	}
}
