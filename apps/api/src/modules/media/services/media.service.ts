import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaType, Prisma } from 'generated/prisma';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    type?: MediaType;
    title?: string;
    year?: number;
    page?: number;
    limit?: number;
  }) {
    const { type, title, page = 1, limit = 10 } = params;

    const where: Prisma.MediaWhereInput = {};

    if (type) {
      where.type = type;
    }

    if (title) {
      where.OR = [
        { title: { contains: title, mode: 'insensitive' } },
        { titleOnRussian: { contains: title, mode: 'insensitive' } },
      ];
    }

    // Здесь можно добавить дополнительные условия для year, если у вас есть такое поле

    const [items, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          movie: type === MediaType.MOVIE || !type,
          anime: type === MediaType.ANIME || !type,
          cartoon: type === MediaType.CARTOON || !type,
          tvShow: type === MediaType.TV_SHOW || !type,
        },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
      include: {
        movie: true,
        anime: true,
        cartoon: true,
        tvShow: true,
      },
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return media;
  }

  async remove(id: string) {
    // Проверяем существует ли запись
    await this.findOne(id);

    // Удаляем сначала связанную запись в зависимости от типа медиа
    const media = await this.prisma.media.findUnique({
      where: { id },
      select: { type: true },
    });

    // Удаляем все записи транзакционно
    return this.prisma.$transaction(async (prisma) => {
      if (media.type === MediaType.MOVIE) {
        await prisma.movie.delete({ where: { mediaId: id } });
      } else if (media.type === MediaType.ANIME) {
        await prisma.anime.delete({ where: { mediaId: id } });
      } else if (media.type === MediaType.CARTOON) {
        await prisma.cartoon.delete({ where: { mediaId: id } });
      } else if (media.type === MediaType.TV_SHOW) {
        await prisma.tvShow.delete({ where: { mediaId: id } });
      }

      return prisma.media.delete({ where: { id } });
    });
  }
}
