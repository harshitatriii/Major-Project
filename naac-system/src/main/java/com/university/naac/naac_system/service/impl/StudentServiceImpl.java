package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.dto.StudentDTO;
import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.Semester;
import com.university.naac.naac_system.entity.Student;
import com.university.naac.naac_system.repository.ProgramRepository;
import com.university.naac.naac_system.repository.SemesterRepository;
import com.university.naac.naac_system.repository.StudentRepository;
import com.university.naac.naac_system.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ProgramRepository programRepository;
    private final SemesterRepository semesterRepository;

    private StudentDTO mapToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setStudentId(student.getStudentId());
        dto.setProgramId(student.getProgram().getProgramId());
        dto.setSemesterId(student.getSemester().getSemesterId());
        dto.setRollNo(student.getRollNo());
        dto.setName(student.getName());
        dto.setGender(student.getGender());
        dto.setAdmissionYear(student.getAdmissionYear());
        dto.setStatus(student.getStatus());
        return dto;
    }

    private Student mapToEntity(StudentDTO dto) {
        Program program = programRepository.findById(dto.getProgramId())
                .orElseThrow(() -> new EntityNotFoundException("Program not found"));
        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new EntityNotFoundException("Semester not found"));

        return Student.builder()
                .studentId(dto.getStudentId())
                .program(program)
                .semester(semester)
                .rollNo(dto.getRollNo())
                .name(dto.getName())
                .gender(dto.getGender())
                .admissionYear(dto.getAdmissionYear())
                .status(dto.getStatus())
                .build();
    }

    @Override
    public StudentDTO createStudent(StudentDTO dto) {
        Student student = mapToEntity(dto);
        return mapToDTO(studentRepository.save(student));
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        student.setRollNo(dto.getRollNo());
        student.setName(dto.getName());
        student.setGender(dto.getGender());
        student.setAdmissionYear(dto.getAdmissionYear());
        student.setStatus(dto.getStatus());

        Program program = programRepository.findById(dto.getProgramId())
                .orElseThrow(() -> new EntityNotFoundException("Program not found"));
        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new EntityNotFoundException("Semester not found"));

        student.setProgram(program);
        student.setSemester(semester);

        return mapToDTO(studentRepository.save(student));
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public StudentDTO getStudentById(Long id) {
        return studentRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
}
