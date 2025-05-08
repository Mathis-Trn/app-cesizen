import api from './api';

export const getActivityTypes = () => {
  return api.get('/activities/types'); 
};

export const getActivityType = ( id: number ) => {
  return api.get(`/activities/types/${id}`); 
};