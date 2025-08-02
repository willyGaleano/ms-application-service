import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { EnrollmentResult } from '@enrollment/types';
import { LoggerService } from '@logger/services';
import { CreateEnrollmentRequest } from '@enrollment/dtos';

@Injectable()
export class EnrollmentService {
  private readonly logger = new Logger(EnrollmentService.name);
  private streams = new Map<string, Subject<EnrollmentResult>>();

  create(payload: CreateEnrollmentRequest): string {
    this.logger.debug(
      LoggerService.createLogEntry('Create Enrollment', {
        payload,
      }),
    );

    const applicationId = uuidv4();
    const subject = new Subject<EnrollmentResult>();
    this.streams.set(applicationId, subject);

    const min = 1 * 60 * 1000;
    const max = 2 * 60 * 1000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    setTimeout(() => {
      const approved = Math.random() < 0.5;
      subject.next({ approved, processedAt: Date.now() });
      subject.complete();
      this.streams.delete(applicationId);
    }, delay);

    return applicationId;
  }

  getApprovalStream(applicationId: string): Observable<EnrollmentResult> {
    const subject = this.streams.get(applicationId);
    if (!subject)
      throw new NotFoundException('Enrollment not found or already processed');

    return subject.asObservable();
  }
}
