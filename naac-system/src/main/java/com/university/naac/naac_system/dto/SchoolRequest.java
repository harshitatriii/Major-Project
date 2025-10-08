package com.university.naac.naac_system.dto;

import lombok.Data;

@Data
public class SchoolRequest {
    private String name;
    private Long universityId; // we pass the university it belongs to
}
