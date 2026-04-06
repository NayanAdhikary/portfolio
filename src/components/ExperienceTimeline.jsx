import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Data Analyst",
    company: "Freelance / Self-Employed",
    period: "2023 - Present",
    description: "Conducted complex data cleaning and exploratory data analysis. Built machine learning models for salary prediction and analyzed large cricket datasets to derive performance insights.",
  },
  {
    role: "Performance Analyst",
    company: "Sports Analytics",
    period: "2022 - 2023",
    description: "Evaluated player performance using statistical methods. Designed dashboards to visualize key performance indicators (KPIs) like strike rate and economy.",
  },
  {
    role: "Data Enthusiast",
    company: "Personal Projects",
    period: "2021 - 2022",
    description: "Started journey into data science. Learned Python, Pandas, and SQL through practical datasets and Kaggle competitions.",
  }
];

export default function ExperienceTimeline() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative border-l-2 border-purple-500/50 pl-8 ml-4 md:ml-0">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            className={`relative ${index === experiences.length - 1 ? 'mb-0' : 'mb-12'}`}
            style={{ marginBottom: index === experiences.length - 1 ? 0 : '3rem' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-10 w-5 h-5 bg-gray-900 border-2 border-purple-500 rounded-full"></div>
            
            <div className="glass-card p-10 rounded-xl relative hover:border-purple-500/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 md:mb-0">{exp.role}</h3>
                <span className="text-sm font-semibold bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              <h4 className="text-xl text-sky-400 mb-8">{exp.company}</h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
