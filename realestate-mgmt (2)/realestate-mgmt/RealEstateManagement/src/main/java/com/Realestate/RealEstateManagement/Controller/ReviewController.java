package com.Realestate.RealEstateManagement.Controller;

import com.Realestate.RealEstateManagement.Entity.Review;
import com.Realestate.RealEstateManagement.Services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access API
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Submit a review
    @PostMapping("/submit")
    public Review submitReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    // Get all reviews
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }
}
