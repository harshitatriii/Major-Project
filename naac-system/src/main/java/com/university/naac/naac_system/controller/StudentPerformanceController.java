package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.PerformanceSummaryResponse;
import com.university.naac.naac_system.dto.StudentPerformanceResponse;
import com.university.naac.naac_system.entity.StudentPerformance;
import com.university.naac.naac_system.service.StudentPerformanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/performances")
public class StudentPerformanceController {

    private final StudentPerformanceService service;

    public StudentPerformanceController(StudentPerformanceService service) {
        this.service = service;
    }

    // Helper mapper
    private StudentPerformanceResponse toDto(StudentPerformance p) {
        StudentPerformanceResponse r = new StudentPerformanceResponse();
        r.setId(p.getId());
        if (p.getStudent() != null) {
            r.setStudentId(p.getStudent().getStudentId());
            r.setStudentName(p.getStudent().getName());
        }
        r.setMarksObtained(p.getMarksObtained());
        r.setTotalMarks(p.getTotalMarks());
        r.setPercentage(p.getPercentage());
        r.setCategory(p.getCategory());
        r.setEvaluatedAt(p.getEvaluatedAt());
        return r;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<StudentPerformanceResponse> evaluate(
            @RequestParam Long studentId,
            @RequestParam Double marksObtained,
            @RequestParam Double totalMarks
    ) {
        StudentPerformance saved = service.evaluatePerformance(studentId, marksObtained, totalMarks);
        return ResponseEntity.ok(toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<StudentPerformanceResponse>> getAll() {
        List<StudentPerformanceResponse> list = service.getAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/program/{programId}")
    public ResponseEntity<List<StudentPerformanceResponse>> getByProgram(@PathVariable Long programId) {
        List<StudentPerformanceResponse> list = service.getByProgram(programId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/semester/{semesterId}")
    public ResponseEntity<List<StudentPerformanceResponse>> getBySemester(@PathVariable Long semesterId) {
        List<StudentPerformanceResponse> list = service.getBySemester(semesterId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    // optionally expose the summary endpoints you already added in service
    @GetMapping("/summary/program/{programId}")
    public ResponseEntity<?> summaryByProgram(@PathVariable Long programId) {
        return ResponseEntity.ok(service.getSummaryByProgram(programId));
    }

    @GetMapping("/summary/semester/{semesterId}")
    public ResponseEntity<?> summaryBySemester(@PathVariable Long semesterId) {
        return ResponseEntity.ok(service.getSummaryBySemester(semesterId));
    }

    @GetMapping("/summary")
    public ResponseEntity<PerformanceSummaryResponse> getSummary(
            @RequestParam(required = false) Long programId) {
        PerformanceSummaryResponse summary = service.getSummary(programId);
        return ResponseEntity.ok(summary);
    }

}
