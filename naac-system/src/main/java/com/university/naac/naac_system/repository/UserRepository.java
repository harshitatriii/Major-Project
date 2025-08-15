package com.university.naac.naac_system.repository;

import com.university.naac.naac_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
