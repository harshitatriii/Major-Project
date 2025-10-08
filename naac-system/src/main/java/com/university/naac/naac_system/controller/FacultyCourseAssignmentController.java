package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.FacultyCourseAssignmentRequest;
import com.university.naac.naac_system.dto.FacultyCourseAssignmentResponse;
import com.university.naac.naac_system.entity.*;
import com.university.naac.naac_system.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty-course-assignments")
public class FacultyCourseAssignmentController {

    private final FacultyCourseAssignmentRepository assignmentRepository;
    private final FacultyRepository facultyRepository;
    private final CourseRepository courseRepository;
    private final SemesterRepository semesterRepository;

    public FacultyCourseAssignmentController(
            FacultyCourseAssignmentRepository assignmentRepository,
            FacultyRepository facultyRepository,
            CourseRepository courseRepository,
            SemesterRepository semesterRepository) {
        this.assignmentRepository = assignmentRepository;
        this.facultyRepository = facultyRepository;
        this.courseRepository = courseRepository;
        this.semesterRepository = semesterRepository;
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<FacultyCourseAssignmentResponse> assignFacultyToCourse(
            @RequestBody FacultyCourseAssignmentRequest request) {

        Faculty faculty = facultyRepository.findById(request.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Semester semester = semesterRepository.findById(request.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));

        FacultyCourseAssignment assignment = FacultyCourseAssignment.builder()
                .faculty(faculty)
                .course(course)
                .semester(semester)
                .build();

        FacultyCourseAssignment saved = assignmentRepository.save(assignment);

        return ResponseEntity.ok(toResponse(saved));
    }

    // ✅ GET ALL
    @GetMapping
    public List<FacultyCourseAssignmentResponse> getAllAssignments() {
        return assignmentRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<FacultyCourseAssignmentResponse> getById(@PathVariable Long id) {
        FacultyCourseAssignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        return ResponseEntity.ok(toResponse(assignment));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<FacultyCourseAssignmentResponse> updateAssignment(
            @PathVariable Long id,
            @RequestBody FacultyCourseAssignmentRequest request) {

        FacultyCourseAssignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        Faculty faculty = facultyRepository.findById(request.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Semester semester = semesterRepository.findById(request.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));

        assignment.setFaculty(faculty);
        assignment.setCourse(course);
        assignment.setSemester(semester);

        FacultyCourseAssignment updated = assignmentRepository.save(assignment);

        return ResponseEntity.ok(toResponse(updated));
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        assignmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    //Helper Method
    private FacultyCourseAssignmentResponse toResponse(FacultyCourseAssignment a) {
        FacultyCourseAssignmentResponse resp = new FacultyCourseAssignmentResponse();
        resp.setAssignmentId(a.getAssignmentId());
        resp.setFacultyName(a.getFaculty().getName());
        resp.setCourseCode(a.getCourse().getCode());

        // Instead of name, we expose semester number
        resp.setSemesterNumber(a.getSemester().getSemesterNumber());

        resp.setAssignedAt(a.getAssignedAt());
        return resp;
    }

}
