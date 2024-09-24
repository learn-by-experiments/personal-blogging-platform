import { IsString, MinLength, IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateArticleDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(20)
  @IsString()
  @IsNotEmpty()
  content: string;
}
