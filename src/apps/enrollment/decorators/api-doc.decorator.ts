import {
  CreateEnrollmentRequest,
  CreateEnrollmentResponse,
} from '@enrollment/dtos';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function CreateEnrollmentApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new enrollment',
      description:
        'Creates a new enrollment in the system with the provided information. Returns the enrollment ID and status upon successful creation.',
    }),
    ApiBody({
      type: CreateEnrollmentRequest,
      description: 'Enrollment data required for creation',
      examples: {
        example1: {
          summary: 'Complete enrollment data',
          description: 'Example with all required fields',
          value: {
            description: 'Enrollment for the Spring 2023 semester',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Enrollment created successfully',
      type: CreateEnrollmentResponse,
      example: {
        enrollmentId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      },
    }),
  );
}

export function WatchApprovalStatusApiDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Watch enrollment approval status',
      description:
        'Server-Sent Events endpoint to receive real-time notifications about enrollment approval status',
    }),
    ApiParam({
      name: 'enrollmentId',
      description: 'The unique identifier of the enrollment to watch',
      example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    }),
    ApiResponse({
      status: 200,
      description: 'SSE stream with enrollment approval status updates',
    }),
  );
}
