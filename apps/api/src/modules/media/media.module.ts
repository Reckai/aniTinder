import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AnimeController } from './controllers/anime.controller';
import { AnimeService } from './services/anime/anime.service';
import { TmdbController } from './controllers/tmdb.controller';
import { TmdbService } from './services/tmdb.service';

@Module({
  imports: [PrismaModule],
  controllers: [MediaController, AnimeController, TmdbController],
  providers: [MediaService, AnimeService, TmdbService],
})
export class MediaModule {}
