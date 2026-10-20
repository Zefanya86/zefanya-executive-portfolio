'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MonolithSceneProps {
  className?: string;
  enableInteractive?: boolean;
}

export default function MonolithScene({ className = '', enableInteractive = true }: MonolithSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setIsLowPower(true);
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    let animationFrameId: number;
    let width = container.clientWidth || 360;
    let height = container.clientHeight || 480;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 4. Lighting setup - Cinematic Obsidian & Crimson
    const ambientLight = new THREE.AmbientLight(0x0e1117, 2.5);
    scene.add(ambientLight);

    // Platinum key light
    const keyLight = new THREE.DirectionalLight(0xd8dde5, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Cinematic Crimson rim light
    const rimLight = new THREE.PointLight(0xd72e43, 6, 20);
    rimLight.position.set(-4, -2, 2);
    scene.add(rimLight);

    // Secondary subtle fill
    const fillLight = new THREE.PointLight(0x6b7280, 2, 15);
    fillLight.position.set(2, -4, 3);
    scene.add(fillLight);

    // 5. Signature Architectural Monolith Mesh Group
    const group = new THREE.Group();
    scene.add(group);

    // Monolith Body: Sculptural elongated prism / polyhedron
    const monolithGeometry = new THREE.CylinderGeometry(0.7, 1.1, 3.6, 6, 1, false);
    const monolithMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c0e12,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
    });
    const monolithMesh = new THREE.Mesh(monolithGeometry, monolithMaterial);
    group.add(monolithMesh);

    // Architectural Crystalline Facets (Edges)
    const wireframeGeometry = new THREE.EdgesGeometry(monolithGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xd8dde5,
      transparent: true,
      opacity: 0.35,
      linewidth: 1,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    group.add(wireframeMesh);

    // Orbiting Floating Platinum Ring
    const ringGeometry = new THREE.TorusGeometry(1.9, 0.025, 16, 64);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xd72e43,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x4a0a12,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Secondary floating ring
    const innerRingGeometry = new THREE.TorusGeometry(2.3, 0.015, 16, 64);
    const innerRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8dde5,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.5,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRingMesh.rotation.y = Math.PI / 4;
    group.add(innerRingMesh);

    // Subtle Particle Field around Monolith
    const particlesCount = 45;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd72e43,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    group.add(particlePoints);

    // Pointer tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!enableInteractive) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = y * 0.5;
    };

    if (enableInteractive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 480;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle floating and rotation
      group.position.y = Math.sin(elapsedTime * 0.8) * 0.15;
      group.rotation.y += 0.005;

      // Orbiting rings
      ringMesh.rotation.z += 0.008;
      innerRingMesh.rotation.x += 0.005;

      // Lerp mouse response
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotationY + group.rotation.y - group.rotation.y) * 0.05;

      // Pulsing crimson light
      rimLight.intensity = 5 + Math.sin(elapsedTime * 2) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (enableInteractive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      monolithGeometry.dispose();
      monolithMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeometry.dispose();
      innerRingMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [enableInteractive, isLowPower]);

  // Fallback for non-WebGL or reduced motion
  if (!webGlSupported || isLowPower) {
    return (
      <div className={`relative flex items-center justify-center p-8 ${className}`}>
        <div className="relative w-48 h-72 rounded-2xl border border-platinum/20 bg-gradient-to-b from-graphite-surface to-obsidian shadow-cinematic flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-radial-spotlight opacity-50" />
          <div className="w-24 h-44 rounded-xl border border-crimson/50 bg-obsidian-deep/80 shadow-glow-crimson flex items-center justify-center transform rotate-6">
            <div className="w-16 h-32 border border-platinum/30 rounded-lg bg-gradient-to-tr from-graphite to-platinum/10" />
          </div>
          <span className="mt-4 text-[10px] tracking-widest text-platinum-muted uppercase font-mono">
            Executive Signature Sculpture
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] pointer-events-none select-none ${className}`}
      aria-label="3D Signature Architectural Monolith"
    />
  );
}
