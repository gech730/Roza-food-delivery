import React from 'react';
import './Home.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import MenuGrid from '../../components/Menu/MenuGrid';
import Services from '../../components/Services/Services';
import Testimonials from '../../components/Testimonials/Testimonials';
import ContactSection from '../../components/ContactSection/ContactSection';

const Home = () => {
  return (
    <div className="home-redesign-wrapper">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Meet Roza (About Section) */}
      <About />

      {/* 4. Menu / Categories Section */}
      <MenuGrid />

      {/* 5. Services & Pricing Section */}
      <Services />

      {/* 6. Customer Love (Testimonials Section) */}
      <Testimonials />

      {/* 7. Contact / Order Inquiry Section */}
      <ContactSection />
    </div>
  );
};

export default Home;
