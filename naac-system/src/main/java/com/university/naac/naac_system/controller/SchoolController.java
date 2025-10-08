package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.SchoolRequest;
import com.university.naac.naac_system.dto.SchoolResponse;
import com.university.naac.naac_system.entity.School;
import com.university.naac.naac_system.entity.University;
import com.university.naac.naac_system.repository.UniversityRepository;
import com.university.naac.naac_system.service.SchoolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/schools")
public class SchoolController {

    private final SchoolService schoolService;
    private final UniversityRepository universityRepository;

    public SchoolController(SchoolService schoolService, UniversityRepository universityRepository) {
        this.schoolService = schoolService;
        this.universityRepository = universityRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<SchoolResponse> create(@RequestBody SchoolRequest request) {
        University university = universityRepository.findById(request.getUniversityId())
                .orElseThrow(() -> new RuntimeException("University not found"));

        School school = new School();
        school.setName(request.getName());
        school.setUniversity(university);

        School saved = schoolService.create(school);

        SchoolResponse response = new SchoolResponse();
        response.setSchoolId(saved.getSchoolId());
        response.setName(saved.getName());
        response.setUniversityName(saved.getUniversity().getName());

        return ResponseEntity.ok(response);
    }

    // GET ALL
    @GetMapping
    public List<SchoolResponse> getAll() {
        return schoolService.getAll().stream().map(s -> {
            SchoolResponse r = new SchoolResponse();
            r.setSchoolId(s.getSchoolId());
            r.setName(s.getName());
            r.setUniversityName(s.getUniversity().getName());
            return r;
        }).collect(Collectors.toList());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<SchoolResponse> getById(@PathVariable Long id) {
        School s = schoolService.getById(id);
        SchoolResponse r = new SchoolResponse();
        r.setSchoolId(s.getSchoolId());
        r.setName(s.getName());
        r.setUniversityName(s.getUniversity().getName());
        return ResponseEntity.ok(r);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<SchoolResponse> update(@PathVariable Long id,
                                                 @RequestBody SchoolRequest request) {
        University university = universityRepository.findById(request.getUniversityId())
                .orElseThrow(() -> new RuntimeException("University not found"));

        School school = new School();
        school.setName(request.getName());
        school.setUniversity(university);

        School updated = schoolService.update(id, school);

        SchoolResponse r = new SchoolResponse();
        r.setSchoolId(updated.getSchoolId());
        r.setName(updated.getName());
        r.setUniversityName(updated.getUniversity().getName());

        return ResponseEntity.ok(r);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        schoolService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
