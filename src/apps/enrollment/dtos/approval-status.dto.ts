import { IsNotEmpty, IsUUID } from 'class-validator';

export class WatchApprovalStatusParam {
  @IsUUID()
  @IsNotEmpty()
  enrollmentId: string;
}
