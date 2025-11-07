package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.MentorMentee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MentorMenteeRepository extends JpaRepository<MentorMentee, Long> {

    List<MentorMentee> findByMentor_FacultyId(Long facultyId);

    List<MentorMentee> findByMentee_StudentId(Long studentId);

    // ✅ Corrected custom queries
    @Query("SELECT COUNT(DISTINCT m.mentor.facultyId) FROM MentorMentee m")
    long countDistinctMentors();

    @Query("SELECT COUNT(DISTINCT m.mentee.studentId) FROM MentorMentee m")
    long countDistinctMentees();
}
