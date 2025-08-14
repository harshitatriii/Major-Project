package com.university.naac.naac_system.entity;

import com.university.naac.naac_system.entity.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.Instant;

@Entity @Table(name="student",
        uniqueConstraints = @UniqueConstraint(name="uk_student_roll", columnNames = {"roll_no","program_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @ManyToOne(optional = false)
    @JoinColumn(name="program_id")
    private Program program;

    @ManyToOne(optional = false)
    @JoinColumn(name="semester_id")
    private Semester semester;

    @Column(name="roll_no", nullable = false)
    private String rollNo;

    @Column(nullable = false)
    private String name;

    private String gender;
    private Integer admissionYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StudentStatus status = StudentStatus.ACTIVE;

    @CreationTimestamp private Instant createdAt;
    @UpdateTimestamp private Instant updatedAt;
}
