package com.university.naac.naac_system.entity;

import com.university.naac.naac_system.entity.enums.LearningCategory;
import jakarta.persistence.*;
import lombok.Data;
import java.time.Instant;

@Entity
@Data
public class StudentPerformance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private Double marksObtained;
    private Double totalMarks;
    private Double percentage;

    @Enumerated(EnumType.STRING)
    private LearningCategory category;

    private Instant evaluatedAt = Instant.now();
}
