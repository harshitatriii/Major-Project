package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.ComplianceResponse;
import java.util.List;

public interface ComplianceService {
    ComplianceResponse create(ComplianceResponse req, Long submittedByUserId);
    List<ComplianceResponse> findByCriteria(Long criteriaId);
}
