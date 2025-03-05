import React from "react";
import Heading from "../../common/Heading";
import "./recent.css"; // Importing recent section styles
import RecentCard from "./RecentCard";

const Recent = () => {
  return (
    <section className="recent padding">
      <div className="container">
        <Heading
          title="Recent Property Listed"
          subtitle="Explore our latest properties, each offering unique features and prime locations, perfect for your next move."
        />
        <RecentCard />
      </div>
    </section>
  );
};

export default Recent;
