package com.university.naac.naac_system.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class FacultyCourseAssignmentResponse {
    private Long assignmentId;
    private String facultyName;
    private String courseCode;
    private int semesterNumber;   // changed from semesterName → semesterNumber
    private Instant assignedAt;
}
