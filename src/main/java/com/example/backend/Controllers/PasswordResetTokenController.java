package com.example.backend.Controllers;


import com.example.backend.services.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordResetTokenController {

    @Autowired
    PasswordResetTokenService passwordResetTokenService;

    @PostMapping("/send-reset-email")
    public void sendPasswordResetEmail(@RequestBody String usermail) {
        passwordResetTokenService.sendPasswordResetEmail(usermail);
    }
}
