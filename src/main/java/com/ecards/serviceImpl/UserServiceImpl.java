package com.ecards.serviceImpl;

import com.ecards.dto.UserDto;
import com.ecards.entity.Role;
import com.ecards.entity.User;
import com.ecards.repository.RoleRepository;
import com.ecards.repository.UserRepository;
import com.ecards.service.EmailService;
import com.ecards.service.UserService;
import com.ecards.util.OTPUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private EmailService emailService;

    @Override
    public User createUser(UserDto userDto) {
        // Check if the email already exists
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            throw new DataIntegrityViolationException("Email already exists.");
        }
        
        // Use ModelMapper to convert UserDto to User
        User user = this.modelMapper.map(userDto, User.class);
        
        // Generate a UUID and convert it to a string
        String userId = UUID.randomUUID().toString();
        user.setUserId(userId);
        
        // Set the active status
        user.setActive(true);

        // Assign default role
        Role defaultRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Default role 'USER' not found"));

        Set<Role> roles = new HashSet<>();
        roles.add(defaultRole);
        user.setRoles(roles);
        
        // Set the current time as user creation time
        user.setUserCreatedTime(LocalDateTime.now());

        // Save the user to the database
        return userRepository.save(user);
    }
    
    public String sendOtpToEmail(String email) throws IOException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

       

      
        User user = optionalUser.get();
        // Only allow ADMINs to request OTP for login
        boolean isAdmin = user.getRoles().stream()
                .anyMatch(role -> role.getRoleName().equalsIgnoreCase("ADMIN"));
        
        if (!isAdmin) {
            throw new RuntimeException("Only admins can log in using OTP.");
        }
        
        String otp = OTPUtil.generateOTP();

        // Set the OTP and OTP generated time
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        
        userRepository.save(user);

        String subject = "Your OTP Code";
        String body = "Your OTP code is: " + otp;
        emailService.sendOtpEmail(user.getEmail(), subject, body);

        return "OTP sent successfully to " + email;
    }

    @Override
    public User verifyOtp(String email, String otp) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User with email " + email + " not found");
        }

        User user = optionalUser.get();

        // Verify if OTP matches and is not expired
        if (!user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP.");
        }

        // Check if OTP is expired (assuming it's valid for 5 minutes)
        if (user.getOtpGeneratedTime().isBefore(LocalDateTime.now().minusMinutes(5))) {
            throw new RuntimeException("OTP has expired.");
        }

        // OTP is valid, return user details
        return user;
    }
    
 // Method to get all active users
    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findByIsActiveTrue(); // Fetch active users only
        return users.stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }

    // 2. Method to update a user
    @Override
    public User updateUser(String userId, UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        User user = optionalUser.get();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setJobTitle(userDto.getJobTitle());
        user.setPhoneNumberPrimary(userDto.getPhoneNumberPrimary());
        user.setPhoneNumberSecondary(userDto.getPhoneNumberSecondary());
        user.setLinkedinLink(userDto.getLinkedinLink());
        user.setWebsiteLink(userDto.getWebsiteLink());

        userRepository.save(user);

        return user;
    }

    // 3. Method for soft delete (temporary delete)
    @Override
    public String softDeleteUser(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        User user = optionalUser.get();
        user.setActive(false);  // Set user as inactive for soft delete

        userRepository.save(user);

        return "User with ID " + userId + " has been deactivated.";
    }
    
 // Method to get a user by ID
    @Override
    public User getUserById(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User with ID " + userId + " not found");
        }

        User user = optionalUser.get();

        // Convert the User entity to UserDto and return
        return user;
    }
}
