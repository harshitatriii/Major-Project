package com.university.naac.naac_system.service;

import com.university.naac.naac_system.dto.MentorMenteeRequest;
import com.university.naac.naac_system.dto.MentorMenteeResponse;
import java.util.List;

public interface MentorMenteeService {

    MentorMenteeResponse assignMentor(MentorMenteeRequest request);

    List<MentorMenteeResponse> getMenteesByMentor(Long facultyId);

    List<MentorMenteeResponse> getMentorByStudent(Long studentId);

    long countMentors();

    long countMentees();
}
