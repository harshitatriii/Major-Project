package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class ProgramResponse {
    private Long programId;
    private String name;
    private String programType;
    private String schoolName; // optional, display linked school name
}
