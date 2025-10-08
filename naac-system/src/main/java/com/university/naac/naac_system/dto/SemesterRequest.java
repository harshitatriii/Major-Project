package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class SemesterRequest {
    private int semesterNumber;
    private Long programId; // link semester to program
}
