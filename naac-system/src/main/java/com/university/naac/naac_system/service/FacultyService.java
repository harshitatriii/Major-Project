package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.Faculty;
import java.util.List;

public interface FacultyService {
    Faculty create(Faculty faculty);
    List<Faculty> getAll();
    Faculty getById(Long id);
    Faculty update(Long id, Faculty faculty);
    void delete(Long id);
}
