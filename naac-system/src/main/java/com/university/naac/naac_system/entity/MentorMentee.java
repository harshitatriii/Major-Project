package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.Instant;

@Data
@Entity
@Table(name = "mentor_mentee")
public class MentorMentee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private Faculty mentor;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student mentee;

    private Instant assignedAt = Instant.now();
}

