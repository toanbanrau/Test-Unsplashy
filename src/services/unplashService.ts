import axios from 'axios';
import { config } from '../config/index'; 

const unsplashApi = axios.create({
  baseURL: config.unsplash.apiUrl, 
  headers: {
    Authorization: `Client-ID ${config.unsplash.apiKey}`,
   }
});

export const searchPhotos = async (query: string, page: number = 1) => {
  try {
    const response = await unsplashApi.get(config.unsplash.searchPhotos, {
      params: {
        query, 
        page, 
        per_page: config.unsplash.perPage,  
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; 
  }
};

export const getPhotos = async (page: number = 1) => {
  try {
    const response = await unsplashApi.get(config.unsplash.getPhotos, {
      params: {
        page,  // Trang kết quả
        per_page: config.unsplash.perPage,  // Số ảnh mỗi trang
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const getPhoto = async (id: string) => {
  try {
    const response = await unsplashApi.get(config.unsplash.getPhoto.replace(':id', id));
    return response.data;
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};