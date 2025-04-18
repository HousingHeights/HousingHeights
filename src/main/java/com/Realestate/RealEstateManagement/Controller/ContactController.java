package com.Realestate.RealEstateManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Realestate.RealEstateManagement.Entity.Contact;
import com.Realestate.RealEstateManagement.Services.ContactService;

import java.util.List;

@CrossOrigin(origins = " http://localhost:3000") // Allow React frontend to communicate with backend
@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

//    @PostMapping
//    public String saveContact(@RequestBody Contact contact) {
//    	
//        contactService.saveContact(contact);
//        return "Contact saved and email sent!";
//    }
    
    @PostMapping
    public String saveContact(@RequestBody Contact contact) {
        System.out.println("Received Contact: " + contact);
        System.out.println("Full Name: " + contact.getFullName());
        contactService.saveContact(contact);
        return "Contact saved and email sent!";
    }


    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }
    
    
}
