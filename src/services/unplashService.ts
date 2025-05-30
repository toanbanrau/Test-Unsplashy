import axios from 'axios';
import { config } from '../config/index'; 
import { IUnplash } from '@/interfaces/unplash';

const unsplashApi = axios.create({
  baseURL: config.unsplash.apiUrl, 
  headers: {
    Authorization: `Client-ID ${config.unsplash.apiKey}`,
   }
});
export const getPhotos = async (
  page: number,
  query?: string
): Promise<IUnplash[]> => {
  try {
    const endpoint = query
      ? config.unsplash.searchPhotos
      : config.unsplash.getPhotos;

    const params = {
      page,
      per_page: config.unsplash.perPage,
      ...(query ? { query } : {}),
    };

    const response = await unsplashApi.get(endpoint, { params });

    return query ? response.data.results : response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const getPhoto = async (id: string): Promise<IUnplash> => {
  try {
    const response = await unsplashApi.get(config.unsplash.getPhoto.replace(":id", id));
    return response.data;
  } catch (error) {
    console.error("Error fetching photo details:", error);
    throw error;
  }
};