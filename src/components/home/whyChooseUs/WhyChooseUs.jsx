import React from "react";
import { whyChooseUsData } from "../../data/Data";
import "./whyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      {/* Section Intro */}
      <h2 className="section-title">Why Choose Us?</h2>
      <p className="section-subtitle">
        We go beyond expectations to provide unmatched security, transparency, and support for every transaction.  
        Your satisfaction is our priority! 
      </p>

      {/* USP Cards Section */}
      <div className="usp-scroll-container">
        <div className="usp-scroll">
          {whyChooseUsData.map((item, index) => (
            <div className="usp-card" key={index}>
              <span className="icon">{item.icon}</span>
              <h3 className="usp-title">{item.title}</h3>
              <p className="usp-text">{item.description}</p>
              <p className="usp-extra">
                {index === 0 && "Advanced encryption and multi-layer authentication keep your data and transactions secure."}
                {index === 1 && "Our experts verify every property listing to ensure a hassle-free experience for you."}
                {index === 2 && "We provide legal assistance, ensuring that every step of your transaction is smooth and transparent."}
                {index === 3 && "Our 24/7 chat support keeps you connected with property owners and our expert team anytime."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="cta-section">
        <h3>Ready to Make the Right Move?</h3>
        <p>Join thousands of satisfied customers who trust us for secure and verified transactions.</p>
        <button className="cta-btn">Get Started Today</button>
      </div>
    </section>
  );
};

export default WhyChooseUs;
