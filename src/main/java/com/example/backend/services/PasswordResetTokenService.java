package com.example.backend.services;


import com.example.backend.dao.PasswordResetTokenRepository;
import com.example.backend.dao.UserRepository;
import com.example.backend.entities.EmailRequest;
import com.example.backend.entities.PasswordResetToken;
import com.example.backend.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    private JavaMailSender emailSender;

   // SimpleMailMessage email;

    public void sendPasswordResetEmail(String usermail) {
        User user = userRepository.getUserByEmail(usermail);
        SimpleMailMessage email =new SimpleMailMessage();
        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiryDate(LocalDateTime.now().plusHours(1)); // Token expires in 1 hour

        passwordResetTokenRepository.save(token);

        // Send the email with the reset link
        String resetLink = "password reset link : http://localhost:4200/reset-password?token=" + token.getToken();
        email.setText(resetLink);
        email.setTo(user.getuMail());
        email.setSubject("password reset");
        emailSender.send(email);
        System.out.println("---------------------sent--------------------------------------");
       
    }

}
