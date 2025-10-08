package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.entity.ComplianceResponse;
import com.university.naac.naac_system.service.ComplianceService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/compliance") @RequiredArgsConstructor
public class ComplianceResponseController {
    private final ComplianceService service;

    @PostMapping
    public ResponseEntity<ComplianceResponse> create(@RequestBody CreateComplianceRequest req) {
        ComplianceResponse cr = new ComplianceResponse();
        cr.setCriteria(req.getCriteria());   // expecting nested ids; or map via DTO->entity in service
        cr.setProgram(req.getProgram());
        cr.setCourse(req.getCourse());
        cr.setDocumentLink(req.getDocumentLink());
        cr.setRemarks(req.getRemarks());
        return ResponseEntity.ok(service.create(cr, req.getSubmittedByUserId()));
    }

    @GetMapping("/by-criteria/{criteriaId}")
    public ResponseEntity<List<ComplianceResponse>> byCriteria(@PathVariable Long criteriaId) {
        return ResponseEntity.ok(service.findByCriteria(criteriaId));
    }

    @Data
    public static class CreateComplianceRequest {
        private com.university.naac.naac_system.entity.Criteria criteria;
        private com.university.naac.naac_system.entity.Program program; // nullable
        private com.university.naac.naac_system.entity.Course course;   // nullable
        private String documentLink;
        private String remarks;
        private Long submittedByUserId;
    }
}
