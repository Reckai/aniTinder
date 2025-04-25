import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TmdbService } from '../services/tmdb.service';

@Controller('api/tmdb')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('search/movies')
  async searchMovies(
    @Query('query') query: string,
    @Query('page') page: number = 1,
  ) {
    if (!query) {
      throw new HttpException(
        'Query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.tmdbService.searchMovies(query, page);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to search movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
