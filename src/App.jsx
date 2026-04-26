import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import TimelineSection from './components/TimelineSection';
import FooterSection from './components/FooterSection';
import ParticlesBg from './components/ParticlesBg';

function App() {
  return (
    <div className="app-container">
      <ParticlesBg />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
