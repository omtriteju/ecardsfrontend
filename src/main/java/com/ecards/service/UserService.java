package com.ecards.service;

import java.io.IOException;
import java.util.List;

import com.ecards.dto.UserDto;
import com.ecards.entity.User;

public interface UserService {

	// Method to create a new user with a default "USER" role
	User createUser(UserDto userDto);

	String sendOtpToEmail(String email) throws IOException;

	User verifyOtp(String email, String otp);

	List<UserDto> getAllUsers(); // Method to get all users

	User updateUser(String userId, UserDto userDto); // Method to update user details

	String softDeleteUser(String userId); // Method for soft delete

	User getUserById(String userId);
}
