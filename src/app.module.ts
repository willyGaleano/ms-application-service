import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@config/config.module';
import { ContextStoreModule } from '@context-store/context-store.module';
import { LoggerAppModule } from '@logger/logger.module';
import { HealthModule } from '@health/health.module';
import { EnrollmentModule } from '@enrollment/enrollment.module';

@Module({
  imports: [
    ConfigAppModule,
    ContextStoreModule,
    LoggerAppModule,
    HealthModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
