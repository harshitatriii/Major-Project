package com.university.naac.naac_system.service;

public interface ReportService {

    record Ratio221(long students, long faculty, double ratio) {}

    Ratio221 studentTeacherRatio(Long programId, Long semesterId);
}
