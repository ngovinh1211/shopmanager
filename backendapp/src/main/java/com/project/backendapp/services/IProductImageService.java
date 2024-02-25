package com.project.backendapp.services;

import com.project.backendapp.models.ProductImage;

public interface IProductImageService {
    ProductImage deleteProductImage(Long id) throws Exception;
}
