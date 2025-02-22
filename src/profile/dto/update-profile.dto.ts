import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;
}
