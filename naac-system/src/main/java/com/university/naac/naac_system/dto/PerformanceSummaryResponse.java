package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class PerformanceSummaryResponse {
    private long totalStudents;
    private long slowLearners;
    private long averageLearners;
    private long advancedLearners;
}
