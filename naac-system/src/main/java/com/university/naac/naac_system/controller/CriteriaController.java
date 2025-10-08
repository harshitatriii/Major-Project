package com.university.naac.naac_system.controller;

import com.university.naac.naac_system.entity.Criteria;
import com.university.naac.naac_system.service.CriteriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/criteria") @RequiredArgsConstructor
public class CriteriaController {
    private final CriteriaService service;

    @PostMapping
    public ResponseEntity<Criteria> create(@RequestBody Criteria c) {
        return ResponseEntity.ok(service.create(c));
    }

    @GetMapping
    public ResponseEntity<List<Criteria>> list() {
        return ResponseEntity.ok(service.findAll());
    }
}
