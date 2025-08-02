import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEnrollmentRequest {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({
    description: 'Description of the enrollment',
    example: 'Enrollment for the Spring 2023 semester',
    type: String,
    minLength: 2,
    maxLength: 100,
  })
  description: string;
}

export class CreateEnrollmentResponse {
  @ApiProperty({
    description: 'Unique identifier for the enrollment',
    example: 'enrollment_12345',
    type: String,
  })
  enrollmentId: string;
}
