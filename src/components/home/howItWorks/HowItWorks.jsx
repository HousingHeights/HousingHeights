import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="step-box"
            >
              <span className="step-number">{currentStep + 1}</span>
              <h3>{steps[currentStep].title}</h3>
              <p>{steps[currentStep].description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="progress-indicator">
            {steps.map((_, index) => (
              <span key={index} className={`dot ${index === currentStep ? "active" : ""}`}></span>
            ))}
          </div>
        </div>

        <button className="nav-btn right" onClick={nextStep} disabled={currentStep === steps.length - 1}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
