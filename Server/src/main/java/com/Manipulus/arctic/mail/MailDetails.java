package com.Manipulus.arctic.mail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailDetails {
    private String toMail;
    private String message;
    private String subject;
}
