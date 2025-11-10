import api from './api';

export const semesterService = {
  getByProgram: (programId) => api.get(`/semesters/byProgram/${programId}`),
  create: (data) => api.post('/semesters', data),
};