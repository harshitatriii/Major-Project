package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    private String name;
    private String code;
    private int credits;

    private boolean isICTEnabled; // for criteria 2.3.3

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    // Getters and Setters
}
