package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {

    // Finds all programs that belong to a given school id
    List<Program> findBySchool_SchoolId(Long schoolId);
}
