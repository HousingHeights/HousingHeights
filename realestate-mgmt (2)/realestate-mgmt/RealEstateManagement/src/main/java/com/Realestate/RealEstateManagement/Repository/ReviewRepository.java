package com.Realestate.RealEstateManagement.Repository;

import com.Realestate.RealEstateManagement.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByOrderByIdDesc(); // Fetch reviews in descending order
}
