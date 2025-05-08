import api from './api';

export const getMenus = (params = {}) => api.get('/menus', { params });

export const getMenuById = (id: number) => api.get(`/menus/${id}`);
