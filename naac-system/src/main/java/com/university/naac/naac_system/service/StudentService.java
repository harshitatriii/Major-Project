package com.university.naac.naac_system.service;

import com.university.naac.naac_system.dto.StudentDTO;
import java.util.List;

public interface StudentService {
    StudentDTO createStudent(StudentDTO studentDTO);
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    void deleteStudent(Long id);
    StudentDTO getStudentById(Long id);
    List<StudentDTO> getAllStudents();
}
