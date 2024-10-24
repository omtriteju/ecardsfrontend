package com.ecards.util;

import java.security.SecureRandom;

public class OTPUtil {

    private static final int OTP_LENGTH = 4;
    private static final String CHARACTERS = "0123456789";

    private static final SecureRandom random = new SecureRandom();

    public static String generateOTP() {
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return otp.toString();
    }
}
