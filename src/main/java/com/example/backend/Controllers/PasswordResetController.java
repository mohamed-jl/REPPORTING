package com.example.backend.Controllers;

import com.example.backend.entities.PasswordResetRequest;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordResetController {
    @Autowired
    private UserService userService;

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody PasswordResetRequest resetRequest) {

        try {
            userService.resetPassword(resetRequest.getToken(), resetRequest.getNewPassword());
            return "Password reset successfully!";
        } catch (Exception e) {
            return "Error resetting password: " + e.getMessage();
        }
    }
}
