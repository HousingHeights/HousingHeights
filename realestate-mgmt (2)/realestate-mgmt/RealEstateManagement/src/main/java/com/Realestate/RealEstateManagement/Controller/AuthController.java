package com.Realestate.RealEstateManagement.Controller;

import com.Realestate.RealEstateManagement.Entity.User;
import com.Realestate.RealEstateManagement.JWTUtil.JwtUtil;
import com.Realestate.RealEstateManagement.Repository.UserRepository.UserRepository;
import com.Realestate.RealEstateManagement.Services.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class AuthController {


    private UserRepository userRepository;


    private JwtUtil jwtUtil;

    private OtpService otpService;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, OtpService otpService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
        this.passwordEncoder = passwordEncoder;
    }

    private PasswordEncoder passwordEncoder;

    // ✅ Step 1: Authenticate & Send OTP
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        // 🔹 Validate User
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "User not found"));
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        // 🔹 Generate OTP and send via email
        String otp = otpService.generateOtp();
        otpService.saveOtp(email, otp);
        boolean otpSent = otpService.sendOtpEmail(email, otp);

        if (otpSent) {
            return ResponseEntity.ok(Map.of("message", "OTP sent to " + email));
        } else {
            return ResponseEntity.status(500).body(Map.of("message", "Failed to send OTP"));
        }
    }

    // ✅ Step 2: Verify OTP & Generate JWT Token
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (!otpService.validateOtp(email, otp)) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid OTP"));
        }

        // 🔹 OTP Verified: Generate JWT Token
        String token = jwtUtil.generateToken(email);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}
