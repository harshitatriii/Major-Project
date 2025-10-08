package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.Course;
import com.university.naac.naac_system.entity.Semester;
import com.university.naac.naac_system.repository.CourseRepository;
import com.university.naac.naac_system.repository.SemesterRepository;
import com.university.naac.naac_system.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepo;
    private final SemesterRepository semesterRepo;

    @Override
    public Course create(Course course) {
        return courseRepo.save(course);
    }

    @Override
    public Course update(Long id, Course course) {
        Course existing = courseRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        existing.setCode(course.getCode());
        existing.setName(course.getName());
        existing.setCredits(course.getCredits());
        existing.setICTEnabled(course.isICTEnabled());
        existing.setSemester(course.getSemester());

        return courseRepo.save(existing);
    }


    @Override
    public void delete(Long id) {
        courseRepo.deleteById(id);
    }

    @Override
    public Course getById(Long id) {
        return courseRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
    }

    @Override
    public List<Course> getAll() {
        return courseRepo.findAll();
    }

    @Override
    public List<Course> getBySemester(Long semesterId) {
        Semester sem = semesterRepo.findById(semesterId)
                .orElseThrow(() -> new IllegalArgumentException("Semester not found"));
        return sem.getCourses();
    }

    @Override
    public Course toggleIct(Long courseId, boolean enabled) {
        Course c = getById(courseId);
        c.setICTEnabled(enabled);
        return courseRepo.save(c);
    }
}
