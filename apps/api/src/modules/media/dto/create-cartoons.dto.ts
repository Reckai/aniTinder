import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCartoonDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  titleOnRussian?: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  episodes: number;

  @ApiProperty({ required: true })
  @IsString()
  poster: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studio: string;
}
