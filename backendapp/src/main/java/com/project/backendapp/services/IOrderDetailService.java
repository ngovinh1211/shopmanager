package com.project.backendapp.services;

import com.project.backendapp.dtos.OrderDetailDTO;
import com.project.backendapp.exceptions.DataNotFoundException;
import com.project.backendapp.models.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO newOrderDetail) throws Exception;
    OrderDetail getOrderDetail(Long id) throws DataNotFoundException;
    OrderDetail updateOrderDetail(Long id, OrderDetailDTO newOrderDetailData) throws DataNotFoundException;
    void deleteById(Long id) throws DataNotFoundException;
    List<OrderDetail> findByOrderId(Long orderId);


}
