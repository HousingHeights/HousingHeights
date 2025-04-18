package com.Realestate.RealEstateManagement.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Realestate.RealEstateManagement.Entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
