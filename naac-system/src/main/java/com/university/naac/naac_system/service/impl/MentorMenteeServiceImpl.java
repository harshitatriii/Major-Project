package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.dto.MentorMenteeRequest;
import com.university.naac.naac_system.dto.MentorMenteeResponse;
import com.university.naac.naac_system.entity.Faculty;
import com.university.naac.naac_system.entity.MentorMentee;
import com.university.naac.naac_system.entity.Student;
import com.university.naac.naac_system.repository.FacultyRepository;
import com.university.naac.naac_system.repository.MentorMenteeRepository;
import com.university.naac.naac_system.repository.StudentRepository;
import com.university.naac.naac_system.service.MentorMenteeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MentorMenteeServiceImpl implements MentorMenteeService {

    private final MentorMenteeRepository repo;
    private final FacultyRepository facultyRepo;
    private final StudentRepository studentRepo;

    public MentorMenteeServiceImpl(MentorMenteeRepository repo, FacultyRepository facultyRepo, StudentRepository studentRepo) {
        this.repo = repo;
        this.facultyRepo = facultyRepo;
        this.studentRepo = studentRepo;
    }

    @Override
    public MentorMenteeResponse assignMentor(MentorMenteeRequest request) {
        Faculty faculty = facultyRepo.findById(request.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
        Student student = studentRepo.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        MentorMentee mapping = new MentorMentee();
        mapping.setMentor(faculty);
        mapping.setMentee(student);

        MentorMentee saved = repo.save(mapping);

        MentorMenteeResponse response = new MentorMenteeResponse();
        response.setId(saved.getId());
        response.setMentorName(faculty.getName());
        response.setStudentName(student.getName());
        response.setAssignedAt(saved.getAssignedAt());

        return response;
    }

    @Override
    public List<MentorMenteeResponse> getMenteesByMentor(Long facultyId) {
        return repo.findByMentor_FacultyId(facultyId).stream().map(mm -> {
            MentorMenteeResponse r = new MentorMenteeResponse();
            r.setId(mm.getId());
            r.setMentorName(mm.getMentor().getName());
            r.setStudentName(mm.getMentee().getName());
            r.setAssignedAt(mm.getAssignedAt());
            return r;
        }).collect(Collectors.toList());
    }

    @Override
    public List<MentorMenteeResponse> getMentorByStudent(Long studentId) {
        return repo.findByMentee_StudentId(studentId).stream().map(mm -> {
            MentorMenteeResponse r = new MentorMenteeResponse();
            r.setId(mm.getId());
            r.setMentorName(mm.getMentor().getName());
            r.setStudentName(mm.getMentee().getName());
            r.setAssignedAt(mm.getAssignedAt());
            return r;
        }).collect(Collectors.toList());
    }

    @Override
    public long countMentors() {
        return repo.countDistinctMentors();
    }

    @Override
    public long countMentees() {
        return repo.countDistinctMentees();
    }
}
