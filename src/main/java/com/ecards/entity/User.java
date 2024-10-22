package com.ecards.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Entity;

import jakarta.persistence.*;

@Entity
public class User {
	
	@Id
    @Column(name = "user_id", columnDefinition = "CHAR(36)")
    private String userId;  // Use String for UUID
	
	private String email;
	
	private String firstName;
	
	private String lastName;
	
	private String jobTitle;
	
	private String phoneNumberPrimary;
	
	private String phoneNumberSecondary;
	
	private String linkedinLink;
	
	private String websiteLink;
	
	private String profileImage;
	
	private boolean isActive=true;
	
	private String otp;
	
	private LocalDateTime otpGeneratedTime; // Field to store OTP generation time
	 
	private LocalDateTime userCreatedTime; // Field to store OTP generation time
	
	@ManyToMany
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

	

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getPhoneNumberPrimary() {
		return phoneNumberPrimary;
	}

	public void setPhoneNumberPrimary(String phoneNumberPrimary) {
		this.phoneNumberPrimary = phoneNumberPrimary;
	}

	public String getPhoneNumberSecondary() {
		return phoneNumberSecondary;
	}

	public void setPhoneNumberSecondary(String phoneNumberSecondary) {
		this.phoneNumberSecondary = phoneNumberSecondary;
	}

	public String getLinkedinLink() {
		return linkedinLink;
	}

	public void setLinkedinLink(String linkedinLink) {
		this.linkedinLink = linkedinLink;
	}

	public String getWebsiteLink() {
		return websiteLink;
	}

	public void setWebsiteLink(String websiteLink) {
		this.websiteLink = websiteLink;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public LocalDateTime getOtpGeneratedTime() {
		return otpGeneratedTime;
	}

	public void setOtpGeneratedTime(LocalDateTime otpGeneratedTime) {
		this.otpGeneratedTime = otpGeneratedTime;
	}

	public LocalDateTime getUserCreatedTime() {
		return userCreatedTime;
	}

	public void setUserCreatedTime(LocalDateTime userCreatedTime) {
		this.userCreatedTime = userCreatedTime;
	}
	
	
	
	
	 
	
	
}
