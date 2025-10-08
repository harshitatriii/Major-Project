package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.Course;
import java.util.List;

public interface CourseService {
    Course create(Course course);
    Course update(Long id, Course course);
    void delete(Long id);
    Course getById(Long id);
    List<Course> getAll();
    List<Course> getBySemester(Long semesterId);
    Course toggleIct(Long courseId, boolean usesIct);
}
