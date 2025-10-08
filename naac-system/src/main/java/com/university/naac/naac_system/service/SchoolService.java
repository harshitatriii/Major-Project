package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.School;
import java.util.List;

public interface SchoolService {
    School create(School school);
    List<School> getAll();
    School getById(Long id);
    School update(Long id, School school);
    void delete(Long id);
}
