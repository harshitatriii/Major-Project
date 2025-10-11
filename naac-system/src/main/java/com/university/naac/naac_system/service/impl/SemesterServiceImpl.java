package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.Semester;
import com.university.naac.naac_system.repository.SemesterRepository;
import com.university.naac.naac_system.service.SemesterService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterServiceImpl implements SemesterService {

    private final SemesterRepository semesterRepository;

    public SemesterServiceImpl(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    @Override
    public Semester create(Semester semester) {
        return semesterRepository.save(semester);
    }

    @Override
    public Semester update(Long id, Semester semester) {
        Semester existing = semesterRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Semester not found"));
        existing.setSemesterNumber(semester.getSemesterNumber());
        existing.setProgram(semester.getProgram());
        return semesterRepository.save(existing);
    }

    @Override
    public Semester getById(Long id) {
        return semesterRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Semester not found"));
    }

    @Override
    public List<Semester> getAll() {
        return semesterRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        semesterRepository.deleteById(id);
    }

    public List<Semester> getByProgram(Long programId) {
        return semesterRepository.findByProgram_ProgramId(programId);
    }
}
