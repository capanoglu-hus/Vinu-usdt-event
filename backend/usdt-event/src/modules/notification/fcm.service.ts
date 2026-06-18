import { Injectable, OnModuleInit } from '@nestjs/common';
import type { App } from 'firebase-admin/app';
import {
  cert,
  getApps,
  initializeApp,
  ServiceAccount,
} from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { NotificationDto } from 'src/dto/create-notification.dto';

@Injectable()
export class FcmService implements OnModuleInit {
  private app: App;

  constructor() {
    const credentials: ServiceAccount = {
      projectId: 'usdt-event',
      clientEmail: 'firebase-adminsdk-fbsvc@usdt-event.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\n*\n-----END PRIVATE KEY-----\n',
    };

    if (getApps().length === 0) {
      this.app = initializeApp({ credential: cert(credentials) });
    }
  }

  onModuleInit() {}

  //viem tarafından bulunan bildirimleri gönderiyor, her zaman çalışır
  async adminMessage(notificationDto: NotificationDto) {
    return await getMessaging().send({
      topic: 'usdt-event',
      notification: {
        title: ' yüksek bakiyeli işlem',
        body: `${notificationDto.amount} USDT aktarildi!`,
      },
      data: {
        sender: notificationDto.from,
        receiver: notificationDto.to,
        transactionHash: notificationDto.tx,
        rawAmount: notificationDto.amount,
      },
    });
  }
  // bir kere çalışıp reacttan gelen tokenle uyumlanacak
  async subscribeToTopic(token: string, topic: string) {
    return await getMessaging().subscribeToTopic(token, topic);
  }
}
