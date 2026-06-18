import { Module } from '@nestjs/common';
import { UsdtMonitorService } from './usdt-monitor.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [UsdtMonitorService],
  exports: [UsdtMonitorService],
})
export class BlockchainModule {}
