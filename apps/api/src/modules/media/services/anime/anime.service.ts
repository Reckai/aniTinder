import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimeDto } from '../../dto';
import { MediaType } from 'generated/prisma';
@Injectable()
export class AnimeService {
  constructor(private prisma: PrismaService) {}

  async create(createAnimeDto: CreateAnimeDto) {
    const { title, titleOnRussian, episodes, studio, poster } = createAnimeDto;

    return this.prisma.$transaction(async (prisma) => {
      // Создаем запись в Media
      const media = await prisma.media.create({
        data: {
          title,
          titleOnRussian,
          type: MediaType.ANIME,
          poster,
        },
      });

      // Создаем запись в Anime
      const anime = await prisma.anime.create({
        data: {
          mediaId: media.id,
          episodes,
          studio,
        },
        include: {
          media: true,
        },
      });

      return anime;
    });
  }

  async findOne(id: string) {
    const anime = await this.prisma.anime.findUnique({
      where: { id },
      include: {
        media: true,
      },
    });

    if (!anime) {
      throw new NotFoundException(`Anime with ID ${id} not found`);
    }

    return anime;
  }

  //   async update(id: string, updateAnimeDto: UpdateAnimeDto) {
  //     const anime = await this.findOne(id);

  //     return this.prisma.$transaction(async (prisma) => {
  //       // Обновляем поля Media
  //       if (updateAnimeDto.title || updateAnimeDto.titleOnRussian) {
  //         await prisma.media.update({
  //           where: { id: anime.mediaId },
  //           data: {
  //             title: updateAnimeDto.title,
  //             titleOnRussian: updateAnimeDto.titleOnRussian,
  //           },
  //         });
  //       }

  //       // Обновляем поля Anime
  //       return prisma.anime.update({
  //         where: { id },
  //         data: {
  //           episodes: updateAnimeDto.episodes,
  //           studio: updateAnimeDto.studio,
  //         },
  //         include: {
  //           media: true,
  //         },
  //       });
  //     });
  //   }
}
