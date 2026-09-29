import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-brand-primary selection:bg-brand-indigo selection:text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      
      {/* Basic Footer */}
      <footer className="border-t border-brand-border bg-brand-dark py-8 text-center">
        <p className="text-brand-muted text-sm">
          &copy; {new Date().getFullYear()} FinAgentX. Engineering Major Project.
        </p>
      </footer>
    </div>
  );
};

export default Home;