package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.FacultyCourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyCourseAssignmentRepository extends JpaRepository<FacultyCourseAssignment, Long> {

    // Method to find the count of distinct faculty members assigned to a specific course
    // (probably will need modifications)
//    int countDistinctFacultyBySemester(Long semesterId);

    // FacultyCourseAssignmentRepository
    @org.springframework.data.jpa.repository.Query("""
    select count(distinct fca.faculty.facultyId)
    from FacultyCourseAssignment fca
    where fca.semester.semesterId = :semesterId
""")
    long countDistinctFacultyBySemester(@org.springframework.data.repository.query.Param("semesterId") Long semesterId);

}
