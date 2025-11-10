import api from './api';

export const assignmentService = {
  getAll: () => api.get('/faculty-course-assignments'),
  create: (data) => api.post('/faculty-course-assignments', data),
};