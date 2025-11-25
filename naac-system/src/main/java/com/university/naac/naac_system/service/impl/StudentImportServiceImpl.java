package com.university.naac.naac_system.service.impl;

import com.university.naac.naac_system.entity.Program;
import com.university.naac.naac_system.entity.Semester;
import com.university.naac.naac_system.entity.Student;
import com.university.naac.naac_system.entity.enums.StudentStatus;
import com.university.naac.naac_system.repository.ProgramRepository;
import com.university.naac.naac_system.repository.SemesterRepository;
import com.university.naac.naac_system.repository.StudentRepository;
import com.university.naac.naac_system.service.StudentImportService;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.Year;

@Service
@RequiredArgsConstructor
public class StudentImportServiceImpl implements StudentImportService {

    private final ProgramRepository programRepository;
    private final SemesterRepository semesterRepository;
    private final StudentRepository studentRepository;

    @Override
    public String importStudents(MultipartFile file) throws Exception {

        InputStream is = file.getInputStream();
        Workbook workbook = WorkbookFactory.create(is);
        Sheet sheet = workbook.getSheetAt(0);

        int imported = 0;

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            String studentName = getCell(row, 3);
            String programRaw = getCell(row, 5);
            String batch = getCell(row, 6);
            String gender = getCell(row, 14);
            String admissionId = getCell(row, 1);
            String statusStr = getCell(row, 20);

            if (studentName == null || programRaw == null) continue;

            // Normalize program name from Excel
            String programNameNorm = normalize(programRaw);

            // Match with DB
            Program program = programRepository.findAll()
                    .stream()
                    .filter(p -> normalize(p.getName()).equals(programNameNorm))
                    .findFirst()
                    .orElse(null);

            if (program == null) {
                System.out.println("PROGRAM NOT FOUND: [" + programRaw + "]");
                continue;
            }

            // Extract year from batch (e.g. "2021-2025")
            Integer admissionYear;
            try {
                admissionYear = Integer.parseInt(batch.substring(0, 4));
            } catch (Exception e) {
                admissionYear = Year.now().getValue();
            }

            // Calculate semester based on current year
            int currentYear = Year.now().getValue();
            int yearDiff = currentYear - admissionYear;
            int semesterNumber = Math.min((yearDiff * 2) + 1, 8);

            // AUTO-CREATE missing semester
            Semester semester = getOrCreateSemester(program, semesterNumber);

            // Student status
            StudentStatus status = StudentStatus.ACTIVE; // default
            if (statusStr != null) {
                switch (statusStr.toLowerCase()) {
                    case "dropout": status = StudentStatus.DROPOUT; break;
                    case "graduated": status = StudentStatus.GRADUATED; break;
                }
            }

            Student student = Student.builder()
                    .name(studentName)
                    .rollNo(admissionId)
                    .program(program)
                    .semester(semester)
                    .gender(gender)
                    .admissionYear(admissionYear)
                    .status(status)
                    .build();

            studentRepository.save(student);
            imported++;
        }

        workbook.close();
        is.close();

        return imported + " students imported successfully!";
    }

    /**
     * AUTO-CREATE SEMESTER IF NOT PRESENT
     */
    private Semester getOrCreateSemester(Program program, int semNumber) {
        return semesterRepository
                .findByProgramAndSemesterNumber(program, semNumber)
                .orElseGet(() -> {
                    System.out.println("CREATING NEW SEMESTER: program="
                            + program.getName()
                            + " sem=" + semNumber);

                    Semester sem = new Semester();
                    sem.setProgram(program);
                    sem.setSemesterNumber(semNumber);

                    return semesterRepository.save(sem);
                });
    }

    // Normalize text
    private String normalize(String value) {
        if (value == null) return null;
        return value.replaceAll("\\s+", "")
                .replace("\r", "")
                .replace("\n", "")
                .trim()
                .toLowerCase();
    }

    private String getCell(Row row, int cellIndex) {
        try {
            Cell cell = row.getCell(cellIndex);
            if (cell == null) return null;
            return cell.toString().trim();
        } catch (Exception e) {
            return null;
        }
    }
}
