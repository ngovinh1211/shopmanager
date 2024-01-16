package com.project.backendapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.backendapp.models.*;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByPhoneNumber(String phoneNumber);
    Optional<User> findByPhoneNumber(String phoneNumber);
}
