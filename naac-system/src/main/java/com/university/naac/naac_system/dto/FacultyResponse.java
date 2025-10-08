package com.university.naac.naac_system.dto;

import com.university.naac.naac_system.entity.enums.FacultyStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class FacultyResponse {
    private Long facultyId;
    private String name;
    private String designation;
    private String qualification;
    private Instant joiningDate;
    private FacultyStatus status;
    private String schoolName;
}
