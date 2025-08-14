package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long semesterId;

    private int semesterNumber; // e.g., 1, 2, 3...

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL)
    private List<Course> courses;

    // Getters and Setters
}
