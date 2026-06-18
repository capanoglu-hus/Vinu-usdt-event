import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FcmService } from './modules/notification/fcm.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fcmService: FcmService,
  ) {}
  // react tarafında üretilen token istek atarak uyum sağlar
  @Post('subscribe')
  async create(@Body() subscribeDto: SubscribeDto) {
    return this.fcmService.subscribeToTopic(subscribeDto.token, 'usdt-event');
  }
}
