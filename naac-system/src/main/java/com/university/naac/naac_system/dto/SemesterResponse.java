package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class SemesterResponse {
    private Long semesterId;
    private int semesterNumber;
    private String programName;
}
