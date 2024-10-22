package com.ecards.controller;

import com.ecards.dto.UserDto;
import com.ecards.entity.User;
import com.ecards.response.ApiResponse;
import com.ecards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/ecards/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // 1. Create a new user
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        User createdUser = userService.createUser(userDto);
        return ResponseEntity.ok(createdUser);
    }

    // 2. Get all users
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // 3. Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    // 4. Update a user
    @PutMapping("/update/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable String userId, @RequestBody UserDto userDto) {
        User updatedUser = userService.updateUser(userId, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    // 5. Soft delete (deactivate) a user
    @DeleteMapping("/deactivate/{userId}")
    public ResponseEntity<ApiResponse<String>> softDeleteUser(@PathVariable String userId) {
        String response = userService.softDeleteUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    // 6. Send OTP to admin email
    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<String>> sendOtpToEmail(@RequestParam String email) throws IOException {
        String response = userService.sendOtpToEmail(email);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }

    // 7. Verify OTP for admin login
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<User>> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        User user = userService.verifyOtp(email, otp);
        return ResponseEntity.ok(new ApiResponse<>(user));
    }
}
