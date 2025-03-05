import React from "react"
import Hero from "./hero/Hero"
import Featured from "./featured/Featured"
import Recent from "./recent/Recent"
import HowItWorks from "./howItWorks/HowItWorks"
import VirtualTours from "./virtualTours/VirtualTours"
import WhyChooseUs from "./whyChooseUs/WhyChooseUs"
import PropertyInsights from "./propertyInsights/PropertyInsights"
import Contact from "./contact/Contact"
import Profile from "./profile/profile"
import PropertiesForm from "./propertiesform/PropertiesForm"


const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <HowItWorks />
      <Profile/>
     
      <VirtualTours />
   <WhyChooseUs />

   <PropertyInsights />
   <section id="contact" className="contact-section">
  <Contact />
  <PropertiesForm/>
</section>

    </>
  )
};

export default Home;
