import api from './api';

export const schoolService = {
  getAll: () => api.get('/schools'),
  create: (data) => api.post('/schools', data),
};