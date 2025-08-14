package com.university.naac.naac_system.entity;


import com.university.naac.naac_system.entity.enums.FacultyStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.Instant;

@Entity @Table(name="faculty")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Faculty {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facultyId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "school_id")
    private School school;

    @Column(nullable = false)
    private String name;

    private String designation;   // Professor, Asst Prof, etc.
    private String qualification; // PhD, M.Tech, ...

    private Instant joiningDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FacultyStatus status = FacultyStatus.ACTIVE;

    @CreationTimestamp private Instant createdAt;
    @UpdateTimestamp private Instant updatedAt;
}
