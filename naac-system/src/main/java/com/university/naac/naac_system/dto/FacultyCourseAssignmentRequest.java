package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class FacultyCourseAssignmentRequest {
    private Long facultyId;
    private Long courseId;
    private Long semesterId;
}
