import { axiosConsult } from "../axios";

export const getRecentlyViewed = async () => {
  try {
    const response = await axiosConsult.get('/analytics/recently-viewed');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recently viewed:', error);
    throw error;
  }
};

export const getMostViewedPortfolios = async () => {
  try {
    const response = await axiosConsult.get('/analytics/most-viewed-portfolios');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recently viewed:', error);
    throw error;
  }
};

export const getMostLikedPortfolios = async () => {
  try {
    const response = await axiosConsult.get('/analytics/most-liked-portfolios');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching recently viewed:', error);
    throw error;
  }
};