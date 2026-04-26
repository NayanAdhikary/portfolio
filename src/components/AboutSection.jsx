import { motion } from 'framer-motion';
import profilePic from '../assets/profile-pic/profile pic.png';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span>👤</span> Get To Know Me
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="about-layout">
          {/* Left — Image with Float */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-image-float">
              <div className="about-image-frame">
                <img src={profilePic} alt="Nayan Adhikary" />
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p>
              I am an <strong style={{ color: 'var(--accent-primary)' }}>MCA student</strong> adept 
              at applying statistical techniques to identify trends and developing comprehensive reports. 
              My passion lies in transforming raw, unstructured data into{' '}
              <strong style={{ color: 'var(--accent-secondary)' }}>meaningful business narratives</strong>.
            </p>
            <p>
              From predicting SF employee salaries with a Random Forest model (R² = 0.82) to 
              crunching a decade of IPL cricket data for strategic coaching KPIs — I thrive on 
              turning complexity into clarity.
            </p>
            <p style={{ color: 'var(--text-hint)', fontSize: '0.95rem' }}>
              Currently seeking dynamic roles where I can leverage statistics, Python, and 
              visualization tools to create measurable business impact.
            </p>

            {/* Contact Pills */}
            <div className="contact-pills">
              <a className="contact-pill" href="https://maps.google.com/?q=Magra,Hooghly" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-location-dot" />
                Magra, Hooghly
              </a>
              <a className="contact-pill" href="mailto:nayan56793@gmail.com">
                <i className="fa-solid fa-envelope" />
                nayan56793@gmail.com
              </a>
              <a className="contact-pill" href="tel:+919330494579">
                <i className="fa-solid fa-phone" />
                +91 9330494579
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
