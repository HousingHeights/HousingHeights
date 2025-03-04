import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddReviewCard.css";

const AddReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Fetch all reviews from the backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/reviews/all")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Submit a review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || rating === 0 || !reviewText.trim()) {
      alert("Please enter your name, rating, and review.");
      return;
    }

    const newReview = { username, reviewText, rating };

    try {
      const response = await axios.post("http://localhost:8080/api/reviews/submit", newReview);
      setReviews([...reviews, response.data]); // Update UI instantly
      setUsername("");
      setReviewText("");
      setRating(0);
      setHover(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <h2>Add Your Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? "filled" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit Review</button>
      </div>

      <h2>Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <h4>{review.username}</h4>
            <p>{"★".repeat(review.rating)} ({review.rating} stars)</p>
            <p>{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddReviewCard;
