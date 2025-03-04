import React from "react";
import { insightsData } from "../../data/Data";
import "./propertyInsights.css";

const PropertyInsights = () => {
  return (
    <section className="insights-section">
      <h2 className="insights-title">📢 Latest Real Estate Insights</h2>
      <p className="insights-subtitle">Stay ahead with in-depth market trends and property investment tips.</p>
      <div className="insights-grid">
        {insightsData.map((item, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{item.title}</h3>
              </div>
              <div className="flip-card-back">
                <ul>
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyInsights;


