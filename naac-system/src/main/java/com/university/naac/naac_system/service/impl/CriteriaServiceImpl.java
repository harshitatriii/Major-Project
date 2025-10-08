package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.Criteria;
import com.university.naac.naac_system.repository.CriteriaRepository;
import com.university.naac.naac_system.service.CriteriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class CriteriaServiceImpl implements CriteriaService {
    private final CriteriaRepository criteriaRepo;
    public Criteria create(Criteria c){ return criteriaRepo.save(c); }
    public List<Criteria> findAll(){ return criteriaRepo.findAll(); }
}
