package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.repository.FacultyCourseAssignmentRepository;
import com.university.naac.naac_system.repository.StudentRepository;
import com.university.naac.naac_system.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final StudentRepository studentRepo;
    private final FacultyCourseAssignmentRepository fcaRepo;

    @Override
    public Ratio221 studentTeacherRatio(Long programId, Long semesterId) {
        long students = studentRepo.countByProgram_ProgramIdAndSemester_SemesterId(programId, semesterId);
        long faculty = Math.max(1, fcaRepo.countDistinctFacultyBySemester(semesterId)); // avoid /0
        double ratio = students / (double) faculty;
        return new Ratio221(students, faculty, ratio);
    }
}

