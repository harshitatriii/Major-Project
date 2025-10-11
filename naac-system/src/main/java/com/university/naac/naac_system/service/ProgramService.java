package com.university.naac.naac_system.service;

import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.School;

import java.util.List;

public interface ProgramService {
    Program create(Program program, School school);
    Program update(Long id, Program program, School school);
    Program getById(Long id);
    List<Program> getAll();
    void delete(Long id);
    List<Program> getBySchoolId(Long schoolId);
}
