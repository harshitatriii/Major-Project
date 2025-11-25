package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    // Finds all programs that belong to a given school id
    List<Program> findBySchool_SchoolId(Long schoolId);

    Program findByName(String name);

    // For matching program names (like B.Tech CSE)
    Optional<Program> findByNameIgnoreCase(String name);
}
