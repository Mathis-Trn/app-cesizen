import api from './api';

export const getPages = (params = {}) => api.get('/pages', { params });

export const getPageById = (id: number) => api.get(`/pages/${id}`);

export const getLatestPages = ( count: number ) => api.get('/pages/latest',  { params: { count } });