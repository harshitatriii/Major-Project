package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
