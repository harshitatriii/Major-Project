package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long universityId;

    private String name;

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL)
    private List<School> schools;

    // Getters and Setters
}
