import { Transform } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  title?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsOptional()
  content?: string;
}
