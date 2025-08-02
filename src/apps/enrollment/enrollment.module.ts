import { Module } from '@nestjs/common';
import { EnrollmentController } from '@enrollment/controllers';
import { EnrollmentService } from '@enrollment/services';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
