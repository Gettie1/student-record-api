import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateCacheMeDto {
  @IsString()
  key: string;
  @IsString()
  value: string;
  @IsOptional()
  @IsNumber()
  ttl?: number;
}
