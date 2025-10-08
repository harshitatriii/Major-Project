package com.university.naac.naac_system.dto;

import com.university.naac.naac_system.entity.enums.StudentStatus;
import lombok.Data;

@Data
public class StudentDTO {
    private Long studentId;
    private Long programId;
    private Long semesterId;
    private String rollNo;
    private String name;
    private String gender;
    private Integer admissionYear;
    private StudentStatus status;
}
