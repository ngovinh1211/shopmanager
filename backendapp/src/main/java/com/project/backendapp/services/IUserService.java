package com.project.backendapp.services;

import com.project.backendapp.dtos.UserDTO;
import com.project.backendapp.exceptions.DataNotFoundException;
import com.project.backendapp.models.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws DataNotFoundException;
    String login(String phoneNumber, String password);
}
