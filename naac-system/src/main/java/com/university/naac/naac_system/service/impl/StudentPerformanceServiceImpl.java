package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.dto.PerformanceSummaryResponse;
import com.university.naac.naac_system.entity.Student;
import com.university.naac.naac_system.entity.StudentPerformance;
import com.university.naac.naac_system.entity.enums.LearningCategory;
import com.university.naac.naac_system.repository.StudentPerformanceRepository;
import com.university.naac.naac_system.repository.StudentRepository;
import com.university.naac.naac_system.service.StudentPerformanceService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentPerformanceServiceImpl implements StudentPerformanceService {

    private final StudentPerformanceRepository performanceRepo;
    private final StudentRepository studentRepo;

    public StudentPerformanceServiceImpl(StudentPerformanceRepository performanceRepo,
                                         StudentRepository studentRepo) {
        this.performanceRepo = performanceRepo;
        this.studentRepo = studentRepo;
    }

    @Override
    public StudentPerformance evaluatePerformance(Long studentId, Double marksObtained, Double totalMarks) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + studentId));

        double percentage = 0.0;
        if (totalMarks != null && totalMarks > 0) {
            percentage = (marksObtained != null ? marksObtained : 0.0) / totalMarks * 100.0;
        }

        LearningCategory category;
        if (percentage < 50.0) category = LearningCategory.SLOW;
        else if (percentage < 75.0) category = LearningCategory.AVERAGE;
        else category = LearningCategory.ADVANCED;

        StudentPerformance perf = new StudentPerformance();
        perf.setStudent(student);
        perf.setMarksObtained(marksObtained);
        perf.setTotalMarks(totalMarks);
        perf.setPercentage(percentage);
        perf.setCategory(category);
        perf.setEvaluatedAt(Instant.now());

        return performanceRepo.save(perf);
    }

    @Override
    public List<StudentPerformance> getAll() {
        return performanceRepo.findAll();
    }

    @Override
    public List<StudentPerformance> getByProgram(Long programId) {
        return performanceRepo.findByStudent_Program_ProgramId(programId);
    }

    @Override
    public List<StudentPerformance> getBySemester(Long semesterId) {
        return performanceRepo.findByStudent_Semester_SemesterId(semesterId);
    }

    @Override
    public Map<LearningCategory, Long> getSummaryByProgram(Long programId) {
        List<StudentPerformance> list = getByProgram(programId);
        return summaryFromList(list);
    }

    @Override
    public Map<LearningCategory, Long> getSummaryBySemester(Long semesterId) {
        List<StudentPerformance> list = getBySemester(semesterId);
        return summaryFromList(list);
    }

    // Helper to produce counts for each category (ensures zero for missing categories)
    private Map<LearningCategory, Long> summaryFromList(List<StudentPerformance> list) {
        Map<LearningCategory, Long> map = new EnumMap<>(LearningCategory.class);
        // initialize zero counts
        for (LearningCategory c : LearningCategory.values()) {
            map.put(c, 0L);
        }
        Map<LearningCategory, Long> counts = list.stream()
                .collect(Collectors.groupingBy(StudentPerformance::getCategory, Collectors.counting()));
        counts.forEach(map::put);
        return map;
    }

    @Override
    public PerformanceSummaryResponse getSummary(Long programId) {
        PerformanceSummaryResponse summary = new PerformanceSummaryResponse();

        long slow, avg, adv;

        if (programId != null) {
            slow = performanceRepo.countSlowByProgram(programId);
            avg = performanceRepo.countAverageByProgram(programId);
            adv = performanceRepo.countAdvancedByProgram(programId);
        } else {
            slow = performanceRepo.countSlowLearners();
            avg = performanceRepo.countAverageLearners();
            adv = performanceRepo.countAdvancedLearners();
        }

        summary.setSlowLearners(slow);
        summary.setAverageLearners(avg);
        summary.setAdvancedLearners(adv);
        summary.setTotalStudents(slow + avg + adv);

        return summary;
    }

}
