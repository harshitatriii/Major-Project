package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

    List<Semester> findByProgram_ProgramId(Long programId);

    // find by program and semesterNumber
    Semester findByProgram_ProgramIdAndSemesterNumber(Long programId, int semesterNumber);
    // OR if you use unique semester numbers per program:
    Semester findBySemesterNumberAndProgram_ProgramId(int semesterNumber, Long programId);

    // Find semester matching a program + semester number
    Optional<Semester> findByProgramAndSemesterNumber(Program program, int semesterNumber);
}
