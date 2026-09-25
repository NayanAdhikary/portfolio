import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
export function CameraRig() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    // Map progress to camera Z-axis: start at 5, end at -60
    const targetZ = 5 - (scrollProgress * 65);
    
    // Smooth cinematic interpolation
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
  });

  return null;
}

export function FloatingElement({ children, position = [0, 0, 0] }) {
  const ref = useRef();
  const initialY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    
    // Ambient hover and rotation based on elapsed time
    const t = state.clock.elapsedTime;
    ref.current.position.y = initialY + Math.sin(t * 1.5) * 0.3;
    ref.current.rotation.y += 0.002;
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

export function FadingElement({ children, position = [0, 0, 0], fadeDistance = 15 }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Calculate Z-distance between camera and this object
    const dist = state.camera.position.z - position[2];
    
    // Determine target opacity based on distance
    let targetOpacity = 0;
    
    if (dist > 0 && dist < fadeDistance) {
      // Object is ahead of camera within fade distance: fade in (0 to 1)
      targetOpacity = 1 - (dist / fadeDistance);
    } else if (dist <= 0 && dist > -10) {
      // Object is slightly behind camera: keep it visible or fade it out
      targetOpacity = 1;
    }

    // Traverse all child meshes and smoothly interpolate their opacity
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

export function SkillOrbit() {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.12;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 1.5;
    }
  });

  const skills = [
    { name: "React", color: "#61dafb" },
    { name: "Python", color: "#3776ab" },
    { name: "Node.js", color: "#339933" },
    { name: "MongoDB", color: "#47a248" },
    { name: "FastAPI", color: "#009688" },
    { name: "Tailwind", color: "#06b6d4" },
    { name: "Machine Learning", color: "#ff6b6b" },
    { name: "Framer Motion", color: "#d946ef" }
  ];
  
  const radius = 6;
  const count = skills.length;

  return (
    <group position={[0, 0, -25]}>
      <group ref={groupRef}>
        {skills.map((skill, i) => {
          const angle = (i / count) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <group key={skill.name} position={[x, Math.sin(angle * 4) * 2, z]} rotation={[0, angle, 0]}>
              <Html transform distanceFactor={10} className="pointer-events-none">
                <div className="px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center font-bold text-xl tracking-wider" style={{ color: skill.color, textShadow: `0 0 15px ${skill.color}50` }}>
                  {skill.name}
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export function ProjectCarousel({ projects }) {
  const groupRef = useRef();
  const radius = 12;
  const count = projects.length;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={[0, -2, -45]}>
      <group ref={groupRef}>
        {projects.map((project, i) => {
          const angle = (i / count) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <group key={project.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
              <Html transform occlude distanceFactor={15} zIndexRange={[100, 0]} className="w-80 pointer-events-none">
                <div 
                  className="glass-panel p-8 rounded-3xl text-white border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_40px_rgba(239,68,68,0.15)] flex flex-col h-full"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="text-xs font-mono text-primary mb-4 tracking-widest uppercase">{project.year}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-md">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-4">{project.description}</p>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <span className="text-xs font-mono text-gray-500 uppercase">{project.tech}</span>
                  </div>
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}
