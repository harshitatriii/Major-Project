package com.university.naac.naac_system.entity;


import com.university.naac.naac_system.entity.enums.ResultStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="student_course_result",
        uniqueConstraints = @UniqueConstraint(name="uk_result_student_course", columnNames = {"student_id","course_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudentCourseResult {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne(optional = false) @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne(optional = false) @JoinColumn(name="course_id")
    private Course course;

    private Double marks;
    private String grade;

    @Enumerated(EnumType.STRING)
    private ResultStatus status; // PASS/FAIL
}
