import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './instanse';
// Экспортируем функцию, которую ожидает orval
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axiosInstance(config).then((response) => response.data);
};
