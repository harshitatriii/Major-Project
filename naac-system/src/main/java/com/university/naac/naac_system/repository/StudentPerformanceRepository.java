package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.StudentPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentPerformanceRepository extends JpaRepository<StudentPerformance, Long> {
    List<StudentPerformance> findByStudent_Program_ProgramId(Long programId);
    List<StudentPerformance> findByStudent_Semester_SemesterId(Long semesterId);

    @Query("SELECT COUNT(sp) FROM StudentPerformance sp WHERE sp.category = 'SLOW'")
    long countSlowLearners();

    @Query("SELECT COUNT(sp) FROM StudentPerformance sp WHERE sp.category = 'AVERAGE'")
    long countAverageLearners();

    @Query("SELECT COUNT(sp) FROM StudentPerformance sp WHERE sp.category = 'ADVANCED'")
    long countAdvancedLearners();

    // Optional filters (if you want to show stats per program)
    @Query("SELECT COUNT(sp) FROM StudentPerformance sp WHERE sp.category = 'SLOW' AND sp.student.program.programId = :programId")
    long countSlowByProgram(Long programId);

    @Query("SELECT COUNT(sp) FROM StudentPerformance sp WHERE sp.category = 'AVERAGE' AND sp.student.program.programId = :programId")
    long countAverageByProgram(Long programId);

    @Query("SELECT COUNT(sp) FROM StudentPerformance sp WHERE sp.category = 'ADVANCED' AND sp.student.program.programId = :programId")
    long countAdvancedByProgram(Long programId);
}

