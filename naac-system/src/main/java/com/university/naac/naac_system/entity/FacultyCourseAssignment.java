package com.university.naac.naac_system.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;

@Entity @Table(name="faculty_course_assignment",
        uniqueConstraints = @UniqueConstraint(name="uk_faculty_course_sem", columnNames = {"faculty_id","course_id","semester_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FacultyCourseAssignment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    @ManyToOne(optional = false) @JoinColumn(name="faculty_id")
    private Faculty faculty;

    @ManyToOne(optional = false) @JoinColumn(name="course_id")
    private Course course;

    // kept for quick reporting even though Course → Semester exists
    @ManyToOne(optional = false) @JoinColumn(name="semester_id")
    private Semester semester;

    @CreationTimestamp
    private Instant assignedAt;
}
