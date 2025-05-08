import api from './api';
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from 'jwt-decode';

const TOKEN_KEY = 'authToken';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.access_token;

  if (token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  const token = response.data.token;

  if (token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const getToken = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token;
};

export const isTokenValid = async () => {
  const token = await getToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp && decoded.exp > now;
  } catch (error) {
    return false;
  }
};

export const logout = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
};

export const forgotPassword = async (email: string) => {
  return api.post('/auth/forgot-password', { email });
};

export const resetPasswordWithCode = async (code: string, newPassword: string) => {
  return api.post('/auth/reset-password', { code, newPassword });
};
