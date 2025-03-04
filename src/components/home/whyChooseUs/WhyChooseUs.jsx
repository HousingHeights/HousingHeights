import React from "react";
import "./whyChooseUs.css";
import { whyChooseUsData }  from "../../data/Data";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <p>Your trust, our priority! Explore our unique selling points.</p>

      <div className="usp-cards">
        {whyChooseUsData.map((item, index) => (
          <div className="usp-card" key={index}>
            <span className="icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Innovative Element: Floating Chat Button */}
      <div className="chat-support">
        <button className="chat-btn">💬 Chat with Us</button>
      </div>
    </section>
  );
};

export default WhyChooseUs;
