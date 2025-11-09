package com.university.naac.naac_system.dto;

import com.university.naac.naac_system.entity.enums.LearningCategory;
import lombok.Data;

import java.time.Instant;

@Data
public class StudentPerformanceResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private Double marksObtained;
    private Double totalMarks;
    private Double percentage;
    private LearningCategory category;
    private Instant evaluatedAt;
}
