package com.university.naac.naac_system.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class MentorMenteeResponse {
    private Long id;
    private String mentorName;
    private String studentName;
    private Instant assignedAt;
}
