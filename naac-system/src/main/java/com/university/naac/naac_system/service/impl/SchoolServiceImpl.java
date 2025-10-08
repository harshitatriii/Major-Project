package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.School;
import com.university.naac.naac_system.repository.SchoolRepository;
import com.university.naac.naac_system.service.SchoolService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepo;

    public SchoolServiceImpl(SchoolRepository schoolRepo) {
        this.schoolRepo = schoolRepo;
    }

    @Override
    public School create(School school) {
        return schoolRepo.save(school);
    }

    @Override
    public List<School> getAll() {
        return schoolRepo.findAll();
    }

    @Override
    public School getById(Long id) {
        return schoolRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("School not found"));
    }

    @Override
    public School update(Long id, School school) {
        School existing = getById(id);
        existing.setName(school.getName());
        existing.setUniversity(school.getUniversity());
        return schoolRepo.save(existing);
    }

    @Override
    public void delete(Long id) {
        schoolRepo.deleteById(id);
    }
}
