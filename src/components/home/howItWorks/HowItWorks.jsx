import React, { useState } from "react";
import "./howItWorks.css";
import { steps } from "../../data/Data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="how-it-works">
      <h2>How It Works</h2>
      <div className="slider-container">
        <button className="nav-btn left" onClick={prevStep} disabled={currentStep === 0}>
          <FaArrowLeft />
        </button>
        <div className="step-content">
          <span className="step-number">{currentStep + 1}</span>
          <h3>{steps[currentStep].title}</h3>
          <p>{steps[currentStep].description}</p>
        </div>
        <button className="nav-btn right" onClick={nextStep} disabled={currentStep === steps.length - 1}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
