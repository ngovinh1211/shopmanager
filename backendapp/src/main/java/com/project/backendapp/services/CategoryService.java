package com.project.backendapp.services;

import com.project.backendapp.dtos.CategoryDTO;
import com.project.backendapp.exceptions.DataNotFoundException;
import com.project.backendapp.models.Category;
import com.project.backendapp.models.Product;
import com.project.backendapp.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    @Transactional
    public Category createCategory(CategoryDTO categoryDTO) {
        Category newCategory = Category
                .builder()
                .name(categoryDTO.getName())
                .build();
        return categoryRepository.save(newCategory);
    }

    @Override
    public Category getCategoryById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional
    public Category updateCategory(long categoryId,
                                   CategoryDTO categoryDTO) {
        Category existingCategory = getCategoryById(categoryId);
        existingCategory.setName(categoryDTO.getName());
        categoryRepository.save(existingCategory);
        return existingCategory;
    }

    @Override
    @Transactional
    public void deleteCategory(long id) throws DataNotFoundException {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find category with id: "+id));;
        if(category != null) {
            categoryRepository.delete(category);
        }
    }
}

