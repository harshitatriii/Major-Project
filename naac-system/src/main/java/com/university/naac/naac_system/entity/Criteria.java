package com.university.naac.naac_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="criteria",
        uniqueConstraints = @UniqueConstraint(name="uk_criteria_code", columnNames = "code"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Criteria {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long criteriaId;

    @Column(nullable = false)
    private String code;          // e.g., "2.2.1"

    @Lob
    private String description;
}
