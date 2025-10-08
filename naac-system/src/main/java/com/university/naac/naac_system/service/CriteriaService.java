package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.Criteria;
import java.util.List;

public interface CriteriaService {
    Criteria create(Criteria c);
    List<Criteria> findAll();
}

