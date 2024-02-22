package com.project.backendapp.services;

import com.project.backendapp.dtos.UpdateUserDTO;
import com.project.backendapp.dtos.UserDTO;
import com.project.backendapp.exceptions.DataNotFoundException;
import com.project.backendapp.models.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password, Long roleId) throws Exception;
    User getUserDetailsFromToken(String token) throws Exception;
    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;
}
