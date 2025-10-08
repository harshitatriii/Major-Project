package com.university.naac.naac_system.controller;


import com.university.naac.naac_system.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/reports") @RequiredArgsConstructor
public class    ReportController {
    private final ReportService reportService;

    @GetMapping("/2_2_1/ratio")
    public ResponseEntity<ReportService.Ratio221> ratio221(
            @RequestParam Long programId,
            @RequestParam Long semesterId)
    {
        return ResponseEntity.ok(reportService.studentTeacherRatio(programId, semesterId));
    }

    // need to add other report criteria as well here ( 2.2.2, 2.3.3) :

//    @GetMapping("/2_2_2/mentor-mentee")
//    public ResponseEntity<ReportService.mentor_mentee222> mentor_mentee222(
//            @RequestParam Long programId,
//            @RequestParam Long SemesterId
//    ) {
//        return ResponseEntity.ok(reportService.)
//    }


}


