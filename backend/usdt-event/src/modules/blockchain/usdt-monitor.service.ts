import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  createPublicClient,
  type PublicClient,
  http,
  parseAbi,
  formatUnits,
} from 'viem';
import { mainnet } from 'viem/chains';
import { FcmService } from '../notification/fcm.service';

@Injectable()
export class UsdtMonitorService implements OnModuleInit {
  private readonly logger = new Logger(UsdtMonitorService.name);
  private publicClient: PublicClient;

  // USDT Kontrat Adresi
  private readonly USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  //  limit (100.000 USDT)
  private readonly LIMIT_AMOUNT = 100000;
  constructor(private readonly fcmService: FcmService) {
    //viem.js ile client bağlantısı
    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http('https://mainnet.infura.io/v3/*'),
    });
  }

  //nestJS uygulaması çalışmaya başladığı anda fonksiyon tetiklenecek
  onModuleInit() {
    this.startUsdtEvent();
  }

  private startUsdtEvent() {
    this.logger.log('USDT MAİNNET DİNLENİYOR');
    // Transfer Event
    const transferAbi = parseAbi([
      'event Transfer(address indexed from, address indexed to, uint256 amount)',
    ]);
    //watchContractEvent ile belirli contractın belirli bir işlemini izliyoruz
    this.publicClient.watchContractEvent({
      address: this.USDT_ADDRESS,
      abi: transferAbi,
      eventName: 'Transfer',
      onLogs: (logs) => {
        logs.forEach((item) => {
          const value = item.args.amount ?? 0n;
          //USDT contract decimal'i 6 olduğu için düzenliyoruz
          const balance = parseFloat(formatUnits(value, 6));

          if (balance >= this.LIMIT_AMOUNT) {
            this.logger.warn(` işlem amount ${balance}`);
            const from = item.args.from;
            const to = item.args.to;
            const tx = item.transactionHash;
            this.logger.warn(
              `yüksek limit uyarisi : işlem tx ${tx} , 
              from: ${from}, 
              to: ${to}`,
            );
            // notification service ile fcm'ye bildirim gönderiyoruz
            this.fcmService.adminMessage({
                from: String(from ?? ''),
                to: String(to ?? ''),
                tx: String(tx ?? ''),
                amount: balance.toString(),
              })
              .then((res) => {
                this.logger.log('firebase bildirimi gönderildi');
              })
              .catch((err) => {
                this.logger.error(
                  `firebase bildirim hatası: ${err instanceof Error ? err.message : String(err)}`,
                );
              });
          }
        });
      },
      onError: (error) => {
        this.logger.error('blockchain hata ');
      },
    });
  }
}
