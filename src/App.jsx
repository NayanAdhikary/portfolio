import React from 'react';
import { portfolioData } from './portfolioData';
import { Code, User, Mail, ChevronDown, ExternalLink } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import { motion } from 'framer-motion';

// Cinematic Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const textReveal = {
  hidden: { opacity: 0, y: 80, rotateX: -20, filter: 'blur(15px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function App() {
  return (
    <div className="w-full min-h-screen bg-black text-gray-200 font-sans selection:bg-primary selection:text-black relative overflow-hidden">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Background Grid, Glowing Orbs & Gradient */}
      <div className="fixed inset-0 bg-grid z-0 opacity-30 pointer-events-none"></div>
      <div className="glow-orb orb-1 z-0"></div>
      <div className="glow-orb orb-2 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-0 pointer-events-none"></div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300"
      >
        <div className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">
          {portfolioData.hero.name.split(' ')[0]} // PORTFOLIO
        </div>
        <div className="flex gap-6 items-center">
          <a href="https://github.com/NayanAdhikary" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300">
            <Code size={20} />
          </a>
          <a href="https://www.linkedin.com/in/nayanadhikary/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300">
            <User size={20} />
          </a>
          <a href="mailto:nayan@example.com" className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300">
            <Mail size={20} />
          </a>
        </div>
      </motion.nav>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[85vh] flex flex-col md:flex-row justify-between items-center mb-24 gap-12 pt-16"
        >
          <div className="flex-1">
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              {portfolioData.hero.role}
            </motion.div>
            
            <div style={{ perspective: '1000px' }}>
              <motion.h1 variants={textReveal} className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 uppercase leading-tight drop-shadow-2xl">
                Nayan <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-glow">Adhikary</span>
              </motion.h1>
            </div>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              {portfolioData.hero.tagline} {portfolioData.about.text}
            </motion.p>

            <motion.a 
              variants={fadeUp}
              href="#projects" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-primary hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 group"
            >
              View Projects
              <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </motion.a>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 w-full flex justify-center md:justify-end relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full max-w-lg md:max-w-xl pointer-events-none z-20 scale-110 md:scale-125 md:origin-right"
            >
              {/* Glowing shadow behind the subject */}
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75"></div>
              <img 
                src="./hero-subject.png" 
                alt="Nayan Adhikary" 
                className="w-full h-auto drop-shadow-[0_0_30px_rgba(239,68,68,0.4)] relative z-10 filter contrast-125 saturate-110"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.h2 variants={fadeUp} className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary"></span> Technical Arsenal
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioData.skills.map((category) => (
              <motion.div 
                variants={fadeUp}
                key={category.id} 
                className="group relative p-8 glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-primary/40 flex flex-col h-full"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Glowing Top Edge */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300 font-mono tracking-wide flex items-center gap-2 group/skill hover:bg-primary/10 hover:border-primary/50 hover:text-white transition-all duration-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all duration-300 group-hover/skill:bg-secondary group-hover/skill:shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.h2 variants={fadeUp} className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-12 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary"></span> Professional Experience
          </motion.h2>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
            {portfolioData.experience.map((item) => (
              <motion.div variants={fadeUp} key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-black border-2 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-300"></div>
                
                <span className="text-xs font-mono text-primary mb-2 block font-semibold tracking-widest">{item.year}</span>
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{item.role}</h3>
                <h4 className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">{item.company} <span className="text-gray-600 px-2">•</span> <span className="text-gray-500 normal-case">{item.location}</span></h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.h2 variants={fadeUp} className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-12 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary"></span> Education & Leadership
          </motion.h2>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
            {portfolioData.education.map((item) => (
              <motion.div variants={fadeUp} key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-black border-2 border-primary/50 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-300"></div>
                
                <span className="text-xs font-mono text-primary mb-2 block font-semibold tracking-widest">{item.year}</span>
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{item.degree}</h3>
                <h4 className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">{item.institution}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          id="projects" 
          className="scroll-mt-32"
        >
          <motion.h2 variants={fadeUp} className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-12 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary"></span> Selected Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <motion.div 
                variants={fadeUp}
                key={project.id} 
                className="group relative p-8 rounded-2xl glass-panel overflow-hidden"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono text-gray-500">{project.year}</span>
                    <a href="https://github.com/NayanAdhikary" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {project.tech}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600"
        >
          <p>© 2026 {portfolioData.hero.name}. All Rights Reserved.</p>
          <p>Designed with absolute precision.</p>
        </motion.footer>

      </main>
    </div>
  );
}
