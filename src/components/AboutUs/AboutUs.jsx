import React from "react";
import "./AboutUs.css"; // Ensure you have your CSS styles here

const Header = () => (
  <header>
    <h1>We Are a Full-Service Property Management Group</h1>
    <p>A Pillar of Excellence in Our Local Industry</p>
  </header>
);

const About = () => (
  <section className="about">
    <div className="content">
      <p className="message">
        With a comprehensive range of services, <br />
        we lead the way in Leasing, Renting, <br />
        Selling, and expertly managing <br />
        both residential and commercial properties. <br />
        Our commitment to delivering exceptional results <br />
        and fostering enduring relationships sets us apart.
      </p>
      <p className="message1">
        With the support of a team of seasoned professionals, <br />
        we bring knowledge and experience to every property <br />
        endeavor.
      </p>
    </div>
    <div className="image">
      <img className="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW2SmOs92cWY3PTv7buJ8BeoRkpBOeNxqnUe7Y5Sf6FPj4gFkj2Puobhw&s" alt="Beautiful property for sale" />
    </div>
  </section>
);

const InfoSection = () => (
  <section className="info">
    <div className="box">
      <h3>Local Insights, Global Outlook</h3>
      <p>We offer a competitive edge in the market.</p>
    </div>
    <div className="box">
      <h3>Your Journey, Our Priority</h3>
      <p>We guide your real estate journey seamlessly.</p>
    </div>
    <div className="box">
      <h3>Mission</h3>
      <p>Delivering the finest real estate service.</p>
    </div>
    <div className="box">
      <h3>Vision</h3>
      <p>Trust, respect, and integrity to empower clients.</p>
    </div>
  </section>
);

const FAQ = () => (
  <section className="faq">
    <h2>Frequently Asked Questions</h2>
    <div className="faq-item">
      <h3>01. What services do you offer in property management?</h3>
      <p>We offer renting, selling, and management services for residential properties, including tenant placement, maintenance, and financial reporting.</p>
    </div>
    <div className="faq-item">
      <h3>02. How do I know if a property is available for rent or sale?</h3>
      <p>Our property listings are updated in real-time on the website. You can check the status or contact us for the latest availability.</p>
    </div>
    <div className="faq-item">
      <h3>03. Since when is the company operational?</h3>
      <p>We have been in business for several years providing trusted services.</p>
    </div>
  </section>
);

const TermsAndConditions = () => (
  <section className="terms">
    <h2>Terms and Conditions</h2>
    <ul>
      <li><strong>1. Acceptance of Terms:</strong> By accessing and using our website, you agree to abide by these Terms and Conditions. If you do not agree, please do not use the website.</li>
      <li><strong>2. User Eligibility:</strong> Users must be at least 18 years old to use the website and its services. By using the website, you confirm that you meet this age requirement.</li>
      <li><strong>3. Property Listings Accuracy:</strong> While we strive to ensure the accuracy of the property listings, we do not guarantee their completeness or timeliness. Property details are subject to change without notice.</li>
      <li><strong>4. Account Registration:</strong> To access certain features, users may be required to create an account. You are responsible for keeping your account information accurate and secure.</li>
      <li><strong>5. No Broker Role:</strong> We are not a real estate broker or agent. The website acts solely as a platform for property listings, and all transactions are between buyers, sellers, and agents directly.</li>
      <li><strong>6. Intellectual Property:</strong> All content on the website, including logos, images, text, and graphics, is owned by housingHeights or its licensors and is protected by intellectual property laws.</li>
      <li><strong>7. Third-Party Links:</strong> Our website may contain links to third-party websites. We are not responsible for the content, products, or services offered by these third-party sites.</li>
      <li><strong>8. User Conduct:</strong> You agree not to use the website for any unlawful activities or to post offensive, illegal, or harmful content. You also agree not to interfere with the functionality of the website.</li>
      <li><strong>9. Privacy Policy:</strong> Your use of the website is governed by our Privacy Policy, which details how we collect, use, and protect your personal information. Please review the policy before using the site.</li>
      <li><strong>10. Limitation of Liability:</strong> housingHeights is not liable for any indirect, incidental, or consequential damages arising from your use of the website. All services are provided.</li>
    </ul>
  </section>
);

const Footer = () => (
  <footer>
    <hr className="whiteline"/>
    <p>&copy; 2024 Property Management Group. All Rights Reserved.</p>
  </footer>
);

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <Header />
      <About />
      <InfoSection />
      <FAQ />
      <TermsAndConditions />
      <Footer />
    </div>
  );
};

export default AboutUs;
