package com.university.naac.naac_system.service;

import org.springframework.web.multipart.MultipartFile;

public interface StudentImportService {
    String importStudents(MultipartFile file) throws Exception;
}
