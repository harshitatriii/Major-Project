package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.ComplianceResponse;
import com.university.naac.naac_system.entity.User;
import com.university.naac.naac_system.repository.ComplianceResponseRepository;
import com.university.naac.naac_system.repository.UserRepository;
import com.university.naac.naac_system.service.ComplianceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class ComplianceServiceImpl implements ComplianceService {
    private final ComplianceResponseRepository crRepo;
    private final UserRepository userRepo;

    @Override
    public ComplianceResponse create(ComplianceResponse req, Long submittedByUserId) {
        User u = userRepo.findById(submittedByUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        req.setSubmittedBy(u);
        return crRepo.save(req);
    }

    @Override
    public List<ComplianceResponse> findByCriteria(Long criteriaId) {
        return crRepo.findAll().stream()
                .filter(c -> c.getCriteria()!=null && c.getCriteria().getCriteriaId().equals(criteriaId))
                .toList();
    }
}
