import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';
import { CameraRig, FloatingElement, FadingElement, SkillOrbit, ProjectCarousel } from './Cinematic3D';
import { portfolioData } from './portfolioData';

export default function Scene() {
  const pointsRef = useRef();
  const { mouse, viewport } = useThree();
  
  // Generate random particles inside a sphere
  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 20;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow constant rotation
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Slight parallax based on mouse movement
      const targetX = (mouse.x * viewport.width) / 10;
      const targetY = (mouse.y * viewport.height) / 10;
      
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <CameraRig />
      
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ef4444"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Hero Section Title at Z = -5 */}
      <FloatingElement position={[0, 1, -5]}>
        <FadingElement fadeDistance={15}>
          <Text
            fontSize={5}
            color="#ff0000"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
            anchorX="center"
            anchorY="middle"
          >
            NAYAN
          </Text>
        </FadingElement>
      </FloatingElement>

      {/* Orbiting Skills at Z = -25 */}
      <SkillOrbit />

      {/* Rotating Carousel of Project Cards at Z = -45 */}
      <ProjectCarousel projects={portfolioData.projects} />
    </>
  );
}
