package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    private String name;

    private String programType; // e.g., B.Tech, M.Tech, MBA

    @ManyToOne
    @JoinColumn(name = "school_id")
    private School school;

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
    private List<Semester> semesters;

    // Getters and Setters
}
