import { Injectable, Logger } from '@nestjs/common';
// Импорт будет доступен после генерации API
import { getTmdbApi } from '../../../generated/tmdb/api';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);

  /**
   * Поиск фильмов по запросу
   */
  async searchMovies(query: string, page: number = 1) {
    try {
      // Заглушка до генерации API
      const result = await getTmdbApi().searchMovie({
        query,
        page,
        language: 'ru-RU',
      });

      return result;
      throw new Error('API not generated yet. Run npm run generate-api first.');
    } catch (error) {
      this.logger.error(
        `Error searching movies: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Получить популярные фильмы
   */
}
