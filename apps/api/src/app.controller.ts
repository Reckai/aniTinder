import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetAnimesQuery } from 'generated/shikiomori/graphql';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('animes')
  async getAnimes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<GetAnimesQuery> {
    try {
      return await this.appService.getAnimeList(limit, page);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch anime data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
