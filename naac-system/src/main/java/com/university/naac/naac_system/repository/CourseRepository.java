package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
