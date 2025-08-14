package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;

@Entity @Table(name="compliance_response",
        indexes = {
                @Index(name="idx_cr_criteria", columnList = "criteria_id"),
                @Index(name="idx_cr_program", columnList = "program_id"),
                @Index(name="idx_cr_course", columnList = "course_id"),
                @Index(name="idx_cr_submitted_by", columnList = "submitted_by")
        })
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ComplianceResponse {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long responseId;

    @ManyToOne(optional = false) @JoinColumn(name="criteria_id")
    private Criteria criteria;

    // scope can be program-level or course-level (both nullable to keep flexible)
    @ManyToOne @JoinColumn(name="program_id")
    private Program program;

    @ManyToOne @JoinColumn(name="course_id")
    private Course course;

    // link to file store/URL (keep longer length)
    @Column(length = 1024)
    private String documentLink;

    @Lob
    private String remarks;

    @ManyToOne(optional = false) @JoinColumn(name="submitted_by")
    private User submittedBy;

    @CreationTimestamp
    private Instant submittedDate;
}
