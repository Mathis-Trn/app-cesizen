import api from './api';

export const getActivityTypes = () => {
  return api.get('/activity-types'); 
};

export const getActivityType = ( id: number ) => {
  return api.get(`/activity-types/${id}`); 
};