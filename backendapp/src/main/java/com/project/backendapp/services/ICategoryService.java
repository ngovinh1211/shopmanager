package com.project.backendapp.services;

import com.project.backendapp.dtos.CategoryDTO;
import com.project.backendapp.exceptions.DataNotFoundException;
import com.project.backendapp.models.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(CategoryDTO category);
    Category getCategoryById(long id);
    List<Category> getAllCategories();
    Category updateCategory(long categoryId, CategoryDTO category);
    void deleteCategory(long id) throws DataNotFoundException;
}
