package com.Realestate.RealEstateManagement.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.Realestate.RealEstateManagement.Entity.Contact;
import com.Realestate.RealEstateManagement.Repository.ContactRepository;

import jakarta.mail.internet.MimeMessage;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void saveContact(Contact contact) {
        contactRepository.save(contact);
        sendAutoReply(contact.getEmail(), contact.getFullName());
        
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    private void sendAutoReply(String email, String Name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject("Thank You for Contacting Us!");
            helper.setText("Dear " + Name + ",\n\nThank you for reaching out! We'll get back to you soon.\n\nBest regards,\nHousing Heights.");

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
