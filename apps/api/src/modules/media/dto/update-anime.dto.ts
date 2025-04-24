import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CreateAnimeDto } from './create-anime.dto';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studio: string;
}
