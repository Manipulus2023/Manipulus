package com.Manipulus.arctic.mail;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "http://localhost:4200") // Add this line to allow requests from the Angular app
public class MailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/send")
    public String sendEmail(@RequestBody MailDetails mailDetails){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject(mailDetails.getSubject());
            message.setTo(mailDetails.getToMail());
            message.setFrom("kavish.theekshana2017@gmail.com");
            message.setText(mailDetails.getMessage());
            javaMailSender.send(message);
            return "Mail sent Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}

