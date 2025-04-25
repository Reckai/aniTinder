import { Injectable } from '@nestjs/common';
import { getAnimes } from './utils/api/shikiomori/requests/animes';
import { GetAnimesQuery } from 'generated/shikiomori/graphql';

@Injectable()
export class AppService {
  /**
   * Получает список аниме с базовыми параметрами фильтрации
   */
  async getAnimeList(
    limit: number = 10,
    page: number = 1,
  ): Promise<GetAnimesQuery> {
    try {
      const response = await getAnimes({ limit, page });
      return response;
    } catch (error) {
      console.error('Error fetching anime list:', error);
      throw error;
    }
  }
}
