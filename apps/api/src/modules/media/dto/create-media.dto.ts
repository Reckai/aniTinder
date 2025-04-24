import { MediaType } from 'generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  titleOnRussian?: string;

  @ApiProperty({ required: true })
  @IsString()
  poster: string;

  @ApiProperty({ enum: MediaType })
  @IsEnum(MediaType)
  type: MediaType;
}
