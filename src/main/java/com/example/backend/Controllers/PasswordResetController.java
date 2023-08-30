package com.example.backend.Controllers;

import com.example.backend.entities.PasswordResetRequest;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordResetController {
    @Autowired
    private final UserService userService;

    public PasswordResetController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest resetRequest) {

        try {
            userService.resetPassword(resetRequest.getToken(), resetRequest.getNewPassword());
            return new ResponseEntity<>("Password reset successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error resetting password: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
