import api from './api';
import { getToken } from './authService';

const withAuth = async () => {
  const token = await getToken();
  if (!token) throw new Error('Token manquant');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProfil = async () => {
  const config = await withAuth();
  return api.get('/profil', config);
};

export const updateProfil = async (data: any) => {
  const config = await withAuth();
  return api.post('/profil/update', data, config);
};

export const changePassword = async (data: any) => {
  const config = await withAuth();
  return api.patch('/profil/change-password', data, config);
};

export const deleteProfile = async () => {
  const config = await withAuth();
  return api.delete('/profil/delete', config);
};
