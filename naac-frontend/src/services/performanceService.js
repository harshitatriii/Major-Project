// src/services/performanceService.js
import api from './api';

export const performanceService = {
  // Evaluate student performance
  evaluateStudent: (studentId, marksObtained, totalMarks) => 
    api.post(`/performances/evaluate`, null, {
      params: { studentId, marksObtained, totalMarks }
    }),
  
  // Get performance summary
  getSummary: () => api.get('/performances/summary'),
  
  // Get all performances (if needed)
  getAll: () => api.get('/performances')
};