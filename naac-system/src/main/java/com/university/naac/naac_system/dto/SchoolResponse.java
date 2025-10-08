package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class SchoolResponse {
    private Long schoolId;
    private String name;
    private String universityName; // include name for clarity in response
}
