package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class ProgramRequest {
    private String name;
    private String programType;
    private Long schoolId; // we pass school ID to link the program
}
