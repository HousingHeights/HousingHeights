package com.Realestate.RealEstateManagement.Services;

import com.Realestate.RealEstateManagement.Entity.Review;
import com.Realestate.RealEstateManagement.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Add a review
    public Review addReview(Review review) {
        review.setSubmittedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return reviewRepository.save(review);
    }

    // Get all reviews sorted by latest
    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByIdDesc();
    }
}
