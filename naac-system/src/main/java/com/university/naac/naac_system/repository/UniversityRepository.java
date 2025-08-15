package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long> {
    // Additional query methods can be defined here if needed
}
