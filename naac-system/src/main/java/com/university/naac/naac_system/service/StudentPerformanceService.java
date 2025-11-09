package com.university.naac.naac_system.service;

import com.university.naac.naac_system.dto.PerformanceSummaryResponse;
import com.university.naac.naac_system.entity.StudentPerformance;
import com.university.naac.naac_system.entity.enums.LearningCategory;

import java.util.List;
import java.util.Map;

public interface StudentPerformanceService {

    // Evaluate & persist a performance record for one student
    StudentPerformance evaluatePerformance(Long studentId, Double marksObtained, Double totalMarks);

    // Fetch raw performance records
    List<StudentPerformance> getAll();
    List<StudentPerformance> getByProgram(Long programId);
    List<StudentPerformance> getBySemester(Long semesterId);

    // Summary counts grouped by LearningCategory for reporting
    Map<LearningCategory, Long> getSummaryByProgram(Long programId);
    Map<LearningCategory, Long> getSummaryBySemester(Long semesterId);

    PerformanceSummaryResponse getSummary(Long programId); // programId is optional
}
