package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.School;
import com.university.naac.naac_system.repository.ProgramRepository;
import com.university.naac.naac_system.service.ProgramService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramServiceImpl implements ProgramService {

    private final ProgramRepository programRepository;

    public ProgramServiceImpl(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

//    @Override
//    public Program create(Program program) {
//        return programRepository.save(program);
//    }

    @Override
    public Program create(Program program, School school) {
        program.setSchool(school);
        return programRepository.save(program);
    }


    @Override
    public Program update(Long id, Program program, School school) {
        Program existing = programRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Program not found"));
        existing.setName(program.getName());
        existing.setProgramType(program.getProgramType());
        existing.setSchool(school);
        return programRepository.save(existing);
    }

    @Override
    public Program getById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Program not found"));
    }

    @Override
    public List<Program> getAll() {
        return programRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        programRepository.deleteById(id);
    }

    @Override
    public List<Program> getBySchoolId(Long schoolId) {
        return programRepository.findBySchool_SchoolId(schoolId);
    }
}
