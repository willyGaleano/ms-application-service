import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { EnrollmentService } from '@enrollment/services';
import {
  CreateEnrollmentApiDoc,
  WatchApprovalStatusApiDoc,
} from '@enrollment/decorators';
import {
  CreateEnrollmentRequest,
  CreateEnrollmentResponse,
  WatchApprovalStatusParam,
} from '@enrollment/dtos';
import { EnrollmentResult } from '@enrollment/types';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @CreateEnrollmentApiDoc()
  create(@Body() dto: CreateEnrollmentRequest): CreateEnrollmentResponse {
    const enrollmentId = this.enrollmentService.create(dto);
    return { enrollmentId };
  }

  @Sse(':enrollmentId/approval-status')
  @WatchApprovalStatusApiDoc()
  watchApprovalStatus(
    @Param() params: WatchApprovalStatusParam,
  ): Observable<MessageEvent> {
    return this.enrollmentService.getApprovalStream(params.enrollmentId).pipe(
      map(
        (result: EnrollmentResult) =>
          ({
            id: `${result.processedAt}`,
            event: 'enrollmentResult',
            data: result,
          }) as unknown as MessageEvent,
      ),
    );
  }
}
