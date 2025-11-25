package com.university.naac.naac_system.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class MentorMenteeResponse {
    private Long id;
    private Long mentorId;
    private Long studentId;

    private String mentorName;
    private String studentName;

    private Instant assignedAt;
}

