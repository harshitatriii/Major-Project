package com.university.naac.naac_system.entity;

import com.university.naac.naac_system.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="app_user",
        uniqueConstraints = @UniqueConstraint(name="uk_user_email", columnNames = "email"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false) private String name;

    @Column(nullable = false) private String email;

    // store a hash if you implement auth; otherwise can be null
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @ManyToOne @JoinColumn(name="school_id")  // optional association
    private School school;

    // if this user corresponds to a faculty member
    @OneToOne @JoinColumn(name="faculty_id")
    private Faculty faculty;
}
