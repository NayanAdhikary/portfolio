import { motion } from 'framer-motion';
import profilePic from '../assets/profile-pic/profile pic.png';

// Floating badge pill — decorative data-analyst skill tags around the photo
function FloatingBadge({ label, icon, style, delay = 0 }) {
  return (
    <motion.div
      className="floating-badge"
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <span className="floating-badge-icon">{icon}</span>
      <span className="floating-badge-label">{label}</span>
    </motion.div>
  );
}

export default function Hero3D() {
  return (
    <div className="profile-card-wrapper">
      {/* Glow backdrop */}
      <div className="profile-glow-backdrop" />

      {/* Main photo frame */}
      <motion.div
        className="profile-frame"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
      >
        {/* Spinning gradient ring */}
        <div className="profile-ring" />

        {/* Photo */}
        <div className="profile-photo-circle">
          <img src={profilePic} alt="Nayan Adhikary" className="profile-photo-img" />
        </div>

        {/* Available dot */}
        <motion.div
          className="available-badge"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span className="available-dot" />
          Available for work
        </motion.div>
      </motion.div>

      {/* Floating skill badges */}
      <FloatingBadge label="Python" icon="🐍" style={{ top: '8%',  left: '-10%' }} delay={0.4} />
      <FloatingBadge label="SQL"    icon="🗄️" style={{ top: '22%', right: '-12%' }} delay={0.55} />
      <FloatingBadge label="Pandas" icon="🐼" style={{ top: '55%', left: '-14%' }} delay={0.7} />
      <FloatingBadge label="ML"     icon="🤖" style={{ bottom: '18%', right: '-10%' }} delay={0.85} />
      <FloatingBadge label="Power BI" icon="📊" style={{ bottom: '4%', left: '10%' }} delay={1.0} />
    </div>
  );
}
