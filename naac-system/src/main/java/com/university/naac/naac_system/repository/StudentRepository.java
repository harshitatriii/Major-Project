package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // StudentRepository
    long countByProgram_ProgramIdAndSemester_SemesterId(Long programId, Long semesterId);

//    // FacultyCourseAssignmentRepository
//    @org.springframework.data.jpa.repository.Query("""
//    select count(distinct fca.faculty.facultyId)
//    from FacultyCourseAssignment fca
//    where fca.semester.semesterId = :semesterId
//""")
//    long countDistinctFacultyBySemester(@org.springframework.data.repository.query.Param("semesterId") Long semesterId);

}
