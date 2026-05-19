import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Benefits from './Benefits';
import EHSFeatures from './EHSFeatures';
import HRMSFeatures from './HRMSFeatures';
import Integrations from './Integrations';
import Recruitment from './Recruitment';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="font-sans min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <EHSFeatures />
        <HRMSFeatures />
        <Recruitment />
        <Integrations />

      </main>
      <Footer />
    </div>
  );
};

export default Home;
