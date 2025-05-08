import api from './api';
import { getToken } from './authService';

export const addFavorite = async (activityId: number) => {
  const token = await getToken();
  if (!token) throw new Error("Utilisateur non authentifié");

  return api.post(`/favorites/${activityId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFavorite = async (activityId: number) => {
  const token = await getToken();
  if (!token) throw new Error("Utilisateur non authentifié");

  return api.delete(`/favorites/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFavorites = async () => {
    const token = await getToken();
    if (!token) throw new Error("Utilisateur non authentifié");
  
    return api.get(`/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};