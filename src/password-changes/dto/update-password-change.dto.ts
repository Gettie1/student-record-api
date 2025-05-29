import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordChangeDto } from './create-password-change.dto';

export class UpdatePasswordChangeDto extends PartialType(
  CreatePasswordChangeDto,
) {}
