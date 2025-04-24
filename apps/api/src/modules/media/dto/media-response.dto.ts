import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from 'generated/prisma';

export class MediaResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '1a2b3c4d-5678-90ef-gh12-3456789ijklm',
  })
  id: string;

  @ApiProperty({
    description: 'Название медиа',
    example: 'Attack on Titan',
  })
  title: string;

  @ApiProperty({
    description: 'Название медия на русском',
    example: 'Аттака титанов',
    nullable: true,
  })
  titleOnRussian: string | null;

  @ApiProperty({
    description: 'Ссылка на постер',
    example: 'www.example.com/image/asdasdasd123-123123',
  })
  poster: string;
  @ApiProperty({
    description: 'Тип медиа',
    example: $Enums.MediaType.ANIME,
    enum: $Enums.MediaType,
  })
  type: $Enums.MediaType;

  @ApiProperty({
    description: 'Дата создания медиа',
    example: '2024-04-22T15:20:01.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Дата последнего обновления медиа',
    example: '2024-04-22T15:45:12.000Z',
  })
  updated_at: Date;
}
