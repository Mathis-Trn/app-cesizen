import api from './api';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';

const TOKEN_KEY = 'authToken';
const isWeb = Platform.OS === 'web';

const Storage = {
  getItem: async (key: string) => {
    if (isWeb) {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  deleteItem: async (key: string) => {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.access_token;

  if (token) {
    await Storage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  const token = response.data.token;

  if (token) {
    await Storage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const getToken = async () => {
  return await Storage.getItem(TOKEN_KEY);
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
  await Storage.deleteItem(TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
};

export const forgotPassword = async (email: string) => {
  return api.post('/auth/forgot-password', { email });
};

export const resetPasswordWithCode = async (code: string, newPassword: string) => {
  return api.post('/auth/reset-password', { code, newPassword });
};
