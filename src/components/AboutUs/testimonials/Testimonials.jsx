


import React from "react";
import { motion } from "framer-motion";
import "./testimonials.css";
import { testimonials } from "../../data/Data";
import StarRating from "./StarRating";

const Testimonials = () => {
  return (
    <div className="testimonial-section">
      <h2 className="testimonial-heading">What Our Clients Say</h2>
      <div className="testimonial-carousel">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="testimonial-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
            <div className="testimonial-content">
              <h3>{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
              <p className="testimonial-text">"{testimonial.review}"</p>
              <StarRating rating={testimonial.rating} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
