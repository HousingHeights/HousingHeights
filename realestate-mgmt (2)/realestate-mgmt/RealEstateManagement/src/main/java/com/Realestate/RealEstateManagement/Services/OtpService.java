package com.Realestate.RealEstateManagement.Services;

import com.Realestate.RealEstateManagement.Entity.User;
import com.Realestate.RealEstateManagement.Repository.UserRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.logging.Logger;

@Service
public class OtpService {

    private UserRepository userRepository;


    private JavaMailSender mailSender;

    private static final Logger logger = Logger.getLogger(OtpService.class.getName());

    public OtpService(UserRepository userRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    // ✅ Generate a 6-digit OTP
    public String generateOtp() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000)); // Ensures a 6-digit OTP
    }

    // ✅ Send OTP via Email
    public boolean sendOtpEmail(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your OTP for Login");
            message.setText("Your OTP is: " + otp + "\nIt expires in 5 minutes.");
            mailSender.send(message);
            logger.info("OTP sent successfully to " + email);
            return true;
        } catch (Exception e) {
            logger.severe("Failed to send OTP to " + email + ": " + e.getMessage());
            return false;
        }
    }

    // ✅ Save OTP in database (invalidate old OTP first)
    public void saveOtp(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setOtp(null); // Invalidate old OTP
            user.setOtpExpiration(null);

            user.setOtp(otp);
            user.setOtpExpiration(LocalDateTime.now().plusMinutes(5)); // OTP valid for 5 minutes

            userRepository.save(user);
            logger.info("OTP saved for user: " + email);
        }
    }

    // ✅ Validate OTP with null checks
    public boolean validateOtp(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getOtp() == null || user.getOtpExpiration() == null) {
                logger.warning("OTP validation failed: No OTP found for " + email);
                return false;
            }

            if (user.getOtpExpiration().isBefore(LocalDateTime.now())) {
                logger.warning("OTP expired for user: " + email);
                return false;
            }

            if (!user.getOtp().equals(otp)) {
                logger.warning("Invalid OTP entered for user: " + email);
                return false;
            }

            // OTP is valid, invalidate it after use
            user.setOtp(null);
            user.setOtpExpiration(null);
            userRepository.save(user);

            logger.info("OTP validated successfully for user: " + email);
            return true;
        }

        logger.warning("OTP validation failed: User not found " + email);
        return false;
    }
}
