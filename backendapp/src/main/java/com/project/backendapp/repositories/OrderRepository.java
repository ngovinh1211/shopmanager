package com.project.backendapp.repositories;

import com.project.backendapp.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Find order by userid
    List<Order> findByUserId(Long userId);
}