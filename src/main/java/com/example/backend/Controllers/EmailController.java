package com.example.backend.Controllers;

import com.example.backend.entities.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private JavaMailSender emailSender;

    @PostMapping("/send-email")

    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("elite.mailtest@gmail.com");
            message.setTo(emailRequest.getTo());
            message.setSubject(emailRequest.getSubject());
            message.setText(emailRequest.getText());
            emailSender.send(message);
            //return "Email sent successfully!";
        } catch (Exception e) {
            //return "Error sending email: " + e.getMessage();
        }
    }
}
