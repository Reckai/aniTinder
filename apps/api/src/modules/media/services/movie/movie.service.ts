import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaType } from 'generated/prisma';
import { CreateMovieDTO } from '../../dto/create-movie.dto';
@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDTO: CreateMovieDTO) {
    const { title, titleOnRussian, poster, duration, director } =
      createMovieDTO;

    return this.prisma.$transaction(async (prisma) => {
      // Создаем запись в Media
      const media = await prisma.media.create({
        data: {
          title,
          titleOnRussian,
          type: MediaType.MOVIE,
          poster,
        },
      });

      const movie = await prisma.movie.create({
        data: {
          mediaId: media.id,
          duration,
          director,
        },
        include: {
          media: true,
        },
      });

      return movie;
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
      throw new NotFoundException(` with ID ${id} not found`);
    }

    return anime;
  }
}
