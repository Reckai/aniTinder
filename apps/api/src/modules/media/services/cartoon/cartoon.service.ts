import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { MediaType } from 'generated/prisma';
import { CreateCartoonDTO } from '../../dto/create-cartoons.dto';
@Injectable()
export class CartoonService {
  constructor(private prisma: PrismaService) {}

  async create(CreateCartoonDTO: CreateCartoonDTO) {
    const { title, titleOnRussian, episodes, poster, network } =
      CreateCartoonDTO;

    return this.prisma.$transaction(async (prisma) => {
      // Создаем запись в Media
      const media = await prisma.media.create({
        data: {
          title,
          titleOnRussian,
          type: MediaType.CARTOON,
          poster,
        },
      });

      const cartoon = await prisma.cartoon.create({
        data: {
          mediaId: media.id,
          episodes,
          network,
        },
        include: {
          media: true,
        },
      });

      return cartoon;
    });
  }
}
