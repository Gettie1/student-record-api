import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminLoginDto } from './create-admin-login.dto';

export class UpdateAdminLoginDto extends PartialType(CreateAdminLoginDto) {}
