package com.project.backendapp.controllers;

import com.project.backendapp.components.LocalizationUtils;
import com.project.backendapp.dtos.CategoryDTO;
import com.project.backendapp.models.Category;
import com.project.backendapp.models.Product;
import com.project.backendapp.responses.CategoryResponse;
import com.project.backendapp.responses.LoginResponse;
import com.project.backendapp.responses.UpdateCategoryResponse;
import com.project.backendapp.services.CategoryService;
import com.project.backendapp.services.ICategoryService;
import com.project.backendapp.utils.MessageKeys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("${api.prefix}/categories")
//Dependency Injection
@RequiredArgsConstructor

public class CategoryController {
    private final ICategoryService categoryService;
    private  final MessageSource messageSource;
    private  final LocaleResolver localeResolver;
    private  final LocalizationUtils localizationUtils;
    @PostMapping("")
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody CategoryDTO categoryDTO,
            BindingResult result) {
        CategoryResponse categoryResponse = new CategoryResponse();
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            categoryResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.INSERT_CATEGORY_FAILED));
            categoryResponse.setErrors(errorMessages);
            return ResponseEntity.badRequest().body(categoryResponse);
        }
        Category category = categoryService.createCategory(categoryDTO);
        categoryResponse.setCategory(category);
        return ResponseEntity.ok(categoryResponse);
    }


    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories(
            @RequestParam("page")     int page,
            @RequestParam("limit")    int limit
    ) {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateCategoryResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryDTO categoryDTO,
            HttpServletRequest request
    ) {
        try {
            UpdateCategoryResponse updateCategoryResponse = new UpdateCategoryResponse();
            categoryService.updateCategory(id, categoryDTO);
            updateCategoryResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.UPDATE_CATEGORY_SUCCESSFULLY));
            return ResponseEntity.ok(updateCategoryResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(UpdateCategoryResponse.builder()
                    .message(localizationUtils.getLocalizedMessage(MessageKeys.UPDATE_CATEGORY_FAILED))
                    .build());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok(localizationUtils.getLocalizedMessage(MessageKeys.DELETE_CATEGORY_SUCCESSFULLY));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(localizationUtils.getLocalizedMessage(MessageKeys.DELETE_CATEGORY_SUCCESSFULLY));
        }

    }
}
