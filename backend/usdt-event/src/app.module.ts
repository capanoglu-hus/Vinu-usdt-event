import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { NotificationModule } from './modules/notification/notification.module';


@Module({
  imports: [BlockchainModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
