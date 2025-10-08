package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.Faculty;
import com.university.naac.naac_system.repository.FacultyRepository;
import com.university.naac.naac_system.service.FacultyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository facultyRepo;

    public FacultyServiceImpl(FacultyRepository facultyRepo) {
        this.facultyRepo = facultyRepo;
    }

    @Override
    public Faculty create(Faculty faculty) {
        return facultyRepo.save(faculty);
    }

    @Override
    public List<Faculty> getAll() {
        return facultyRepo.findAll();
    }

    @Override
    public Faculty getById(Long id) {
        return facultyRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Faculty not found"));
    }

    @Override
    public Faculty update(Long id, Faculty faculty) {
        Faculty existing = getById(id);
        existing.setName(faculty.getName());
        existing.setDesignation(faculty.getDesignation());
        existing.setQualification(faculty.getQualification());
        existing.setJoiningDate(faculty.getJoiningDate());
        existing.setStatus(faculty.getStatus());
        existing.setSchool(faculty.getSchool());
        return facultyRepo.save(existing);
    }

    @Override
    public void delete(Long id) {
        facultyRepo.deleteById(id);
    }
}
