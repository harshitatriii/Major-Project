import api from './api';

export const reportService = {
  getStudentTeacherRatio: (programId, semesterId) => 
    api.get(`/api/reports/2_2_1/ratio`, {
      params: { programId, semesterId }
    }),
};