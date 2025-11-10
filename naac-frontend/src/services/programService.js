import api from './api';

export const programService = {
  getBySchool: (schoolId) => api.get(`/programs/getBySchool/${schoolId}`),
  create: (data) => api.post('/programs', data),
};