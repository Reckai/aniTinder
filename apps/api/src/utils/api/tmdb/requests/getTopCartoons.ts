import { getTmdbApi } from 'src/generated/tmdb/api';
export const getPopularMovies = async (page: number = 1) => {
  // После генерации API добавьте здесь соответствующий метод
  try {
    // Заглушка до генерации API
    const result = await getTmdbApi().discoverMovie({
      language: 'ru-Ru',
      page,
      with_keywords: '6513',
      sort_by: 'vote_average.desc',
      'vote_average.gte': 0,
      'vote_average.lte': 10,
      'vote_count.gte': 300,
    });

    return result;
    throw new Error('API not generated yet. Run npm run generate-api first.');
  } catch (error) {
    console.error(`Error searching movies: ${error.message}`, error.stack);
    throw error;
  }
};
