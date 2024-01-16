package com.project.backendapp.services;

import com.project.backendapp.dtos.OrderDTO;
import com.project.backendapp.exceptions.DataNotFoundException;
import com.project.backendapp.models.Order;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;
    Order getOrder(Long id);
    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;
    void deleteOrder(Long id);
    List<Order> findByUserId(Long userId);
}
