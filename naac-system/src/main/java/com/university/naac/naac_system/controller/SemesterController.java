package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.SemesterRequest;
import com.university.naac.naac_system.dto.SemesterResponse;
import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.Semester;
import com.university.naac.naac_system.repository.ProgramRepository;
import com.university.naac.naac_system.service.SemesterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/semesters")
public class SemesterController {

    private final SemesterService semesterService;
    private final ProgramRepository programRepository;

    public SemesterController(SemesterService semesterService, ProgramRepository programRepository) {
        this.semesterService = semesterService;
        this.programRepository = programRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<SemesterResponse> createSemester(@RequestBody SemesterRequest request) {
        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found"));

        Semester semester = new Semester();
        semester.setSemesterNumber(request.getSemesterNumber());
        semester.setProgram(program);

        Semester saved = semesterService.create(semester);

        SemesterResponse response = new SemesterResponse();
        response.setSemesterId(saved.getSemesterId());
        response.setSemesterNumber(saved.getSemesterNumber());
        response.setProgramName(saved.getProgram().getName());

        return ResponseEntity.ok(response);
    }

    // GET ALL
    @GetMapping
    public List<SemesterResponse> getAllSemesters() {
        return semesterService.getAll().stream().map(s -> {
            SemesterResponse r = new SemesterResponse();
            r.setSemesterId(s.getSemesterId());
            r.setSemesterNumber(s.getSemesterNumber());
            r.setProgramName(s.getProgram() != null ? s.getProgram().getName() : null);
            return r;
        }).collect(Collectors.toList());
    }

    // GET BY PROGRAM
    @GetMapping("/byProgram/{programId}")
    public ResponseEntity<List<SemesterResponse>> getByProgram(@PathVariable Long programId) {
        List<SemesterResponse> response = semesterService.getByProgram(programId).stream().map(s -> {
            SemesterResponse r = new SemesterResponse();
            r.setSemesterId(s.getSemesterId());
            r.setSemesterNumber(s.getSemesterNumber());
            r.setProgramName(s.getProgram() != null ? s.getProgram().getName() : null);
            return r;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<SemesterResponse> getById(@PathVariable Long id) {
        Semester s = semesterService.getById(id);
        SemesterResponse r = new SemesterResponse();
        r.setSemesterId(s.getSemesterId());
        r.setSemesterNumber(s.getSemesterNumber());
        r.setProgramName(s.getProgram() != null ? s.getProgram().getName() : null);
        return ResponseEntity.ok(r);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<SemesterResponse> updateSemester(@PathVariable Long id,
                                                           @RequestBody SemesterRequest request) {
        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found"));

        Semester semester = new Semester();
        semester.setSemesterNumber(request.getSemesterNumber());
        semester.setProgram(program);

        Semester updated = semesterService.update(id, semester);

        SemesterResponse r = new SemesterResponse();
        r.setSemesterId(updated.getSemesterId());
        r.setSemesterNumber(updated.getSemesterNumber());
        r.setProgramName(updated.getProgram() != null ? updated.getProgram().getName() : null);
        return ResponseEntity.ok(r);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSemester(@PathVariable Long id) {
        semesterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
