import api from './api';

export const getActivities = ( params = {} ) => api.get('/activities', { params });

export const getActivityById = (id: number) => api.get(`/activities/${id}`);

export const getLatestActivities = ( count: number ) => api.get('/activities/latest', { params: { count } });