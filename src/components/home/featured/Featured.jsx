import React from "react";
import Heading from "../../common/Heading";
import "./featured.css";
import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <section className="featured">
      <div className="container">
        {/* Title and Subtitle with animation */}
        <div className="heading-container">
          <Heading title="Featured Property Types" subtitle="Discover properties that match your lifestyle." />
        </div>

        {/* Featured Cards */}
        <div className="featured-content">
          <FeaturedCard />
        </div>
      </div>
    </section>
  );
};

export default Featured;

