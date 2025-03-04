package com.Realestate.RealEstateManagement.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data  // Lombok for getters, setters, toString, equals, and hashCode
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(length = 1000) // To allow long reviews
    private String reviewText;

    private int rating; // Rating between 1-5

    private String submittedAt;
}
