package com.busbooking.service;


import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;



@Service
public class OtpService {

    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> expiryStorage = new ConcurrentHashMap<>();

    public String generateOtp(String email) {
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);

        otpStorage.put(email, otp);
        expiryStorage.put(email, System.currentTimeMillis() + (5 * 60 * 1000)); // 5 min

        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        if (!otpStorage.containsKey(email)) return false;

        String storedOtp = otpStorage.get(email);
        long expiry = expiryStorage.get(email);

        if (System.currentTimeMillis() > expiry) {
            otpStorage.remove(email);
            expiryStorage.remove(email);
            return false;
        }

        if (storedOtp.equals(otp)) {
            otpStorage.remove(email);
            expiryStorage.remove(email);
            return true;
        }

        return false;
    }
}