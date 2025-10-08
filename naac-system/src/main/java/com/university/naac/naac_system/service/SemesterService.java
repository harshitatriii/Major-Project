package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.Semester;

import java.util.List;

public interface SemesterService {
    Semester create(Semester semester);
    Semester update(Long id, Semester semester);
    Semester getById(Long id);
    List<Semester> getAll();
    void delete(Long id);
}
