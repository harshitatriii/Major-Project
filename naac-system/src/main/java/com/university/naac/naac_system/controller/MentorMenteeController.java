package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.dto.MentorMenteeRequest;
import com.university.naac.naac_system.dto.MentorMenteeResponse;
import com.university.naac.naac_system.service.MentorMenteeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mentor-mentee")
public class MentorMenteeController {

    private final MentorMenteeService service;

    public MentorMenteeController(MentorMenteeService service) {
        this.service = service;
    }

    @PostMapping("/assign")
    public ResponseEntity<MentorMenteeResponse> assignMentor(@RequestBody MentorMenteeRequest request) {
        return ResponseEntity.ok(service.assignMentor(request));
    }

    @GetMapping("/mentees/{facultyId}")
    public List<MentorMenteeResponse> getMenteesByMentor(@PathVariable Long facultyId) {
        return service.getMenteesByMentor(facultyId);
    }

    @GetMapping("/mentor/{studentId}")
    public List<MentorMenteeResponse> getMentorByStudent(@PathVariable Long studentId) {
        return service.getMentorByStudent(studentId);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCounts() {
        long mentors = service.countMentors();
        long mentees = service.countMentees();
        return ResponseEntity.ok(new Object() {
            public final long totalMentors = mentors;
            public final long totalMentees = mentees;
        });
    }
}
