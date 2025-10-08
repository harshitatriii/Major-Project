package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.entity.Course;
import com.university.naac.naac_system.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService service;

    @PostMapping
    public ResponseEntity<Course> create(@RequestBody Course course) {
        return ResponseEntity.ok(service.create(course));
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable Long id, @RequestBody Course course) {
        return ResponseEntity.ok(service.update(id, course));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/semester/{semesterId}")
    public ResponseEntity<List<Course>> getBySemester(@PathVariable Long semesterId) {
        return ResponseEntity.ok(service.getBySemester(semesterId));
    }

    // special for 2.3.3 ICT toggle
    @PatchMapping("/{id}/ict")
    public ResponseEntity<Course> toggleIct(@PathVariable Long id, @RequestParam boolean usesIct) {
        return ResponseEntity.ok(service.toggleIct(id, usesIct));
    }
}
