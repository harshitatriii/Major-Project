import api from './api';

export const facultyService = {
  getAll: () => api.get('/faculties'),
  create: (data) => api.post('/faculties', data),
};