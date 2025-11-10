import api from './api';

export const studentService = {
  getAll: () => api.get('/students'),
  create: (data) => api.post('/students', data),
};