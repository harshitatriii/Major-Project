package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.ProgramRequest;
import com.university.naac.naac_system.dto.ProgramResponse;
import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.School;
import com.university.naac.naac_system.repository.SchoolRepository;
import com.university.naac.naac_system.service.ProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/programs")
public class ProgramController {

    private final ProgramService programService;
    private final SchoolRepository schoolRepository;

    public ProgramController(ProgramService programService, SchoolRepository schoolRepository) {
        this.programService = programService;
        this.schoolRepository = schoolRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(@RequestBody ProgramRequest request) {
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School not found"));

        Program program = new Program();
        program.setName(request.getName());
        program.setProgramType(request.getProgramType());
        program.setSchool(school);

        Program saved = programService.create(program, school);

        ProgramResponse response = new ProgramResponse();
        response.setProgramId(saved.getProgramId());
        response.setName(saved.getName());
        response.setProgramType(saved.getProgramType());
        response.setSchoolName(saved.getSchool().getName());

        return ResponseEntity.ok(response);
    }

    // GET ALL
    @GetMapping
    public List<ProgramResponse> getAllPrograms() {
        return programService.getAll().stream().map(p -> {
            ProgramResponse r = new ProgramResponse();
            r.setProgramId(p.getProgramId());
            r.setName(p.getName());
            r.setProgramType(p.getProgramType());
            r.setSchoolName(p.getSchool() != null ? p.getSchool().getName() : null);
            return r;
        }).collect(Collectors.toList());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getById(@PathVariable Long id) {
        Program p = programService.getById(id);
        ProgramResponse r = new ProgramResponse();
        r.setProgramId(p.getProgramId());
        r.setName(p.getName());
        r.setProgramType(p.getProgramType());
        r.setSchoolName(p.getSchool() != null ? p.getSchool().getName() : null);
        return ResponseEntity.ok(r);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProgramResponse> updateProgram(@PathVariable Long id,
                                                         @RequestBody ProgramRequest request) {
        School school = schoolRepository.findById(request.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School not found"));

        Program program = new Program();
        program.setName(request.getName());
        program.setProgramType(request.getProgramType());

        Program updated = programService.update(id, program, school);

        ProgramResponse r = new ProgramResponse();
        r.setProgramId(updated.getProgramId());
        r.setName(updated.getName());
        r.setProgramType(updated.getProgramType());
        r.setSchoolName(updated.getSchool() != null ? updated.getSchool().getName() : null);
        return ResponseEntity.ok(r);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
