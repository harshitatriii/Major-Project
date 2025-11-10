// src/services/mentorMenteeService.js
import api from './api';

export const mentorMenteeService = {
  // Create mentor-mentee mapping
  create: (data) => api.post('/mentor-mentees', data),
  
  // Get all mentees under a specific mentor
  getMenteesByMentor: (facultyId) => api.get(`/mentor-mentees/mentor/${facultyId}`),
  
  // Get mentor of a specific student
  getMentorByMentee: (studentId) => api.get(`/mentor-mentees/mentee/${studentId}`),
  
  // Get count summary
  getCountSummary: () => api.get('/mentor-mentees/count-summary'),
  
  // Get all mappings (if needed)
  getAll: () => api.get('/mentor-mentees')
  //nothing
};