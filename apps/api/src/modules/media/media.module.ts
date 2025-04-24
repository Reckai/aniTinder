import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AnimeController } from './controllers/anime.controller';
import { AnimeService } from './services/anime/anime.service';

@Module({
  imports: [PrismaModule],
  controllers: [MediaController, AnimeController],
  providers: [MediaService, AnimeService],
})
export class MediaModule {}
