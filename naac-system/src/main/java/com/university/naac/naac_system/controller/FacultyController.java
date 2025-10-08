package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.FacultyRequest;
import com.university.naac.naac_system.dto.FacultyResponse;
import com.university.naac.naac_system.entity.Faculty;
import com.university.naac.naac_system.entity.School;
import com.university.naac.naac_system.repository.SchoolRepository;
import com.university.naac.naac_system.service.FacultyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/faculties")
public class FacultyController {

    private final FacultyService facultyService;
    private final SchoolRepository schoolRepository;

    public FacultyController(FacultyService facultyService, SchoolRepository schoolRepository) {
        this.facultyService = facultyService;
        this.schoolRepository = schoolRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<FacultyResponse> create(@RequestBody FacultyRequest request) {
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School not found"));

        Faculty faculty = new Faculty();
        faculty.setName(request.getName());
        faculty.setDesignation(request.getDesignation());
        faculty.setQualification(request.getQualification());
        faculty.setJoiningDate(request.getJoiningDate());
        faculty.setStatus(request.getStatus());
        faculty.setSchool(school);

        Faculty saved = facultyService.create(faculty);

        FacultyResponse response = new FacultyResponse();
        response.setFacultyId(saved.getFacultyId());
        response.setName(saved.getName());
        response.setDesignation(saved.getDesignation());
        response.setQualification(saved.getQualification());
        response.setJoiningDate(saved.getJoiningDate());
        response.setStatus(saved.getStatus());
        response.setSchoolName(saved.getSchool().getName());

        return ResponseEntity.ok(response);
    }

    // GET ALL
    @GetMapping
    public List<FacultyResponse> getAll() {
        return facultyService.getAll().stream().map(f -> {
            FacultyResponse r = new FacultyResponse();
            r.setFacultyId(f.getFacultyId());
            r.setName(f.getName());
            r.setDesignation(f.getDesignation());
            r.setQualification(f.getQualification());
            r.setJoiningDate(f.getJoiningDate());
            r.setStatus(f.getStatus());
            r.setSchoolName(f.getSchool().getName());
            return r;
        }).collect(Collectors.toList());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<FacultyResponse> getById(@PathVariable Long id) {
        Faculty f = facultyService.getById(id);
        FacultyResponse r = new FacultyResponse();
        r.setFacultyId(f.getFacultyId());
        r.setName(f.getName());
        r.setDesignation(f.getDesignation());
        r.setQualification(f.getQualification());
        r.setJoiningDate(f.getJoiningDate());
        r.setStatus(f.getStatus());
        r.setSchoolName(f.getSchool().getName());
        return ResponseEntity.ok(r);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<FacultyResponse> update(@PathVariable Long id,
                                                  @RequestBody FacultyRequest request) {
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School not found"));

        Faculty faculty = new Faculty();
        faculty.setName(request.getName());
        faculty.setDesignation(request.getDesignation());
        faculty.setQualification(request.getQualification());
        faculty.setJoiningDate(request.getJoiningDate());
        faculty.setStatus(request.getStatus());
        faculty.setSchool(school);

        Faculty updated = facultyService.update(id, faculty);

        FacultyResponse r = new FacultyResponse();
        r.setFacultyId(updated.getFacultyId());
        r.setName(updated.getName());
        r.setDesignation(updated.getDesignation());
        r.setQualification(updated.getQualification());
        r.setJoiningDate(updated.getJoiningDate());
        r.setStatus(updated.getStatus());
        r.setSchoolName(updated.getSchool().getName());

        return ResponseEntity.ok(r);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        facultyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
