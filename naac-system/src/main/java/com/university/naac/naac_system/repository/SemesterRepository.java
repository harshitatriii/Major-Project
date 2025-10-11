package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

    List<Semester> findByProgram_ProgramId(Long programId);

}
