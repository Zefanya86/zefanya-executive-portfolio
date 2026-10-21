'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Globe,
  Navigation as NavIcon,
  MapPin,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Layers,
  Sparkles,
} from 'lucide-react';

interface OperationsNetwork3DProps {
  className?: string;
}

export default function OperationsNetwork3D({ className = '' }: OperationsNetwork3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'google-earth' | 'tactical'>('google-earth');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(5.6);

  const projectNodes = [
    {
      id: 0,
      name: 'Bekasi Strategic Command HQ',
      company: 'PT. Aba Mandiri Sejahtera',
      role: 'General Manager (2026 — Present)',
      scope: 'Enterprise Procurement & Commercial Real Estate Governance',
      lat: -6.2383,
      lon: 106.9756,
      coords: '6.2383° S, 106.9756° E',
      status: 'Active Command',
      earthUrl: 'https://earth.google.com/web/@-6.2383,106.9756,50a,5000d,35y,0h,45t,0r',
      highlights: '100% SOP Enforcement · Commercial Property Portfolio Operations',
    },
    {
      id: 1,
      name: 'Bayah Mineral Logistics Hub',
      company: 'PT. Mahaputra Baruna Logistik',
      role: 'Site Operations Manager (2025)',
      scope: 'Bulk Mineral Flow Transport, Fleet Telemetry, Loading to Delivery',
      lat: -6.9288,
      lon: 106.2536,
      coords: '6.9288° S, 106.2536° E',
      status: 'Field Operations',
      earthUrl: 'https://earth.google.com/web/@-6.9288,106.2536,120a,9000d,35y,0h,55t,0r',
      highlights: '10,000 Ton/Minggu Mineral Transport · Zero Bottleneck Fleet Dispatch',
    },
    {
      id: 2,
      name: 'Maritime Bridge Construction Project',
      company: 'PT. Asri — Praya, KSO',
      role: 'Head of Logistics / Material Procurement (2024 — 2025)',
      scope: 'Kalimantan Island to Laut Island Maritime Bridge Infrastructure',
      lat: -3.3194,
      lon: 116.2230,
      coords: '3.3194° S, 116.2230° E',
      status: 'Infrastructure Milestone',
      earthUrl: 'https://earth.google.com/web/@-3.3194,116.2230,200a,14000d,35y,0h,60t,0r',
      highlights: 'Civil Bulk Procurement · Supply-chain Vessel & Barge Coordination',
    },
  ];

  // Spherical Coordinates Mapper (lat/lon to Vector3 on sphere of given radius)
  const latLonToVector3 = (lat: number, lon: number, radius = 2.02): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // References to communicate with Three.js animation loop
  const targetRotationRef = useRef<{ y: number; x: number }>({ y: -3.45, x: -0.1 });
  const cameraZRef = useRef<number>(5.6);
  const viewModeRef = useRef<'google-earth' | 'tactical'>(viewMode);
  const isRotatingRef = useRef<boolean>(isRotating);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // When active node changes, smoothly fly globe to face that coordinate
  useEffect(() => {
    const node = projectNodes[activeNode];
    const phi = (90 - node.lat) * (Math.PI / 180);
    const theta = (node.lon + 180) * (Math.PI / 180);
    const targetY = -(theta - Math.PI / 2);
    const targetX = (Math.PI / 2 - phi) * 0.8;
    targetRotationRef.current = { y: targetY, x: targetX };
  }, [activeNode]);

  // Camera distance zoom
  useEffect(() => {
    cameraZRef.current = zoomLevel;
  }, [zoomLevel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;
    let animationFrameId: number;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZRef.current);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer with High-Precision Tone Mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 4. Realistic Celestial Lighting
    // Ambient light simulating deep space starlight
    const ambientLight = new THREE.AmbientLight(0xdde5ff, 1.1);
    scene.add(ambientLight);

    // Warm Directional Sun Light creating day/night terminator
    const sunLight = new THREE.DirectionalLight(0xfffaed, 4.2);
    sunLight.position.set(7, 5, 6);
    scene.add(sunLight);

    // Subtle Crimson Accent Rim Light
    const crimsonRim = new THREE.PointLight(0xd72e43, 3.5, 25);
    crimsonRim.position.set(-7, 2, -5);
    scene.add(crimsonRim);

    // 5. Main Rotating Operations Group
    const networkGroup = new THREE.Group();
    // Default initial orientation: Indonesia archipelago faces camera
    networkGroup.rotation.y = -3.45;
    networkGroup.rotation.x = -0.1;
    scene.add(networkGroup);

    // Texture Loader for Photorealistic Google Earth Satellite Mode
    const textureLoader = new THREE.TextureLoader();

    // --- REALISTIC GOOGLE EARTH SATELLITE LAYER ---
    const earthGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const earthDayTex = textureLoader.load('/textures/earth/earth_atmos_2048.jpg');
    const earthNormalTex = textureLoader.load('/textures/earth/earth_normal_2048.jpg');
    const earthLightsTex = textureLoader.load('/textures/earth/earth_lights_2048.png');
    const earthSpecularTex = textureLoader.load('/textures/earth/earth_specular_2048.jpg');

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthDayTex,
      normalMap: earthNormalTex,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: earthSpecularTex,
      roughness: 0.65,
      metalness: 0.1,
      emissiveMap: earthLightsTex,
      emissive: new THREE.Color(0xffeedd),
      emissiveIntensity: 0.9,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    networkGroup.add(earthMesh);

    // Atmospheric Cloud Layer (Drifting independently)
    const cloudGeo = new THREE.SphereGeometry(2.035, 64, 64);
    const earthCloudsTex = textureLoader.load('/textures/earth/earth_clouds_1024.png');
    const cloudMat = new THREE.MeshStandardMaterial({
      map: earthCloudsTex,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    networkGroup.add(cloudMesh);

    // Realistic Rayleigh Scattering Atmospheric Outer Glow (Fresnel Shader)
    const atmosGeo = new THREE.SphereGeometry(2.18, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.28, 0.62, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    networkGroup.add(atmosMesh);

    // --- TACTICAL CYBER GRID LAYER ---
    const tacticalGeo = new THREE.SphereGeometry(2.0, 36, 18);
    const tacticalMat = new THREE.MeshBasicMaterial({
      color: 0x1d2430,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const tacticalMesh = new THREE.Mesh(tacticalGeo, tacticalMat);
    networkGroup.add(tacticalMesh);

    // Orbital Tactical Latitude Rings
    const ringGeo = new THREE.RingGeometry(2.35, 2.38, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd8dde5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    networkGroup.add(ringMesh);

    const secondRingGeo = new THREE.RingGeometry(2.65, 2.68, 64);
    const secondRingMat = new THREE.MeshBasicMaterial({
      color: 0xd72e43,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const secondRingMesh = new THREE.Mesh(secondRingGeo, secondRingMat);
    secondRingMesh.rotation.x = Math.PI / 2.3;
    networkGroup.add(secondRingMesh);

    // 6. Real Indonesian Project Coordinates (projected on 3D sphere)
    const nodeCoords = projectNodes.map((n) => latLonToVector3(n.lat, n.lon, 2.02));
    const nodeMeshes: THREE.Mesh[] = [];

    nodeCoords.forEach((pos, idx) => {
      // Beacon Sphere Marker
      const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0xd72e43 : 0xff3855,
        emissive: idx === 0 ? 0xd72e43 : 0xa11c2e,
        emissiveIntensity: 2.2,
        roughness: 0.1,
      });
      const nodeSphere = new THREE.Mesh(sphereGeo, sphereMat);
      nodeSphere.position.copy(pos);
      networkGroup.add(nodeSphere);
      nodeMeshes.push(nodeSphere);

      // Outer Radar Pulse Ring
      const pulseGeo = new THREE.RingGeometry(0.09, 0.13, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xd72e43,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(pos);
      pulseMesh.lookAt(pos.clone().multiplyScalar(2));
      networkGroup.add(pulseMesh);
    });

    // 7. Quadratic Bezier Logistics Arcs between Hubs
    function createCurve(p1: THREE.Vector3, p2: THREE.Vector3, heightBoost = 0.45) {
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(p1.length() + heightBoost);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: 0xd72e43,
        transparent: true,
        opacity: 0.85,
      });
      return { line: new THREE.Line(geo, mat), curve };
    }

    // Arc 1: Bayah Banten -> Bekasi HQ (Bulk Mineral Flow)
    const arc1 = createCurve(nodeCoords[1], nodeCoords[0], 0.35);
    networkGroup.add(arc1.line);

    // Arc 2: Bekasi HQ -> Kalimantan Maritime Bridge (Bridge Material Procurement pipeline)
    const arc2 = createCurve(nodeCoords[0], nodeCoords[2], 0.55);
    networkGroup.add(arc2.line);

    // Traveling Cargo / Material Packets
    const packetGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packet1 = new THREE.Mesh(packetGeo, packetMat);
    const packet2 = new THREE.Mesh(packetGeo, packetMat);
    networkGroup.add(packet1);
    networkGroup.add(packet2);

    // Ambient floating orbital starfield
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 9;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd8dde5,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    networkGroup.add(particleField);

    // 8. Physical Pointer Drag with Realistic Momentum & Inertia
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      velocityX = 0;
      velocityY = 0;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      velocityX = deltaX * 0.004;
      velocityY = deltaY * 0.004;
      networkGroup.rotation.y += velocityX;
      networkGroup.rotation.x += velocityY;
      targetRotationRef.current.y = networkGroup.rotation.y;
      targetRotationRef.current.x = networkGroup.rotation.x;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoomLevel((prev) => Math.min(Math.max(prev + e.deltaY * 0.004, 3.6), 7.5));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    dom.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support with inertia for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        velocityX = 0;
        velocityY = 0;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      velocityX = deltaX * 0.005;
      velocityY = deltaY * 0.005;
      networkGroup.rotation.y += velocityX;
      networkGroup.rotation.x += velocityY;
      targetRotationRef.current.y = networkGroup.rotation.y;
      targetRotationRef.current.x = networkGroup.rotation.x;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // 9. Main Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera zoom interpolation
      camera.position.z += (cameraZRef.current - camera.position.z) * 0.1;

      // Mode visibility management
      const isGoogleEarth = viewModeRef.current === 'google-earth';
      earthMesh.visible = isGoogleEarth;
      cloudMesh.visible = isGoogleEarth;
      atmosMesh.visible = isGoogleEarth;
      tacticalMesh.visible = !isGoogleEarth;

      // Rotate clouds slowly around Earth
      if (isGoogleEarth) {
        cloudMesh.rotation.y = elapsed * 0.025;
      }

      // Physics momentum & Fly-To interpolation
      if (!isDragging) {
        if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
          // Gliding with physical inertia decay
          networkGroup.rotation.y += velocityX;
          networkGroup.rotation.x += velocityY;
          velocityX *= 0.94;
          velocityY *= 0.94;
          targetRotationRef.current.y = networkGroup.rotation.y;
          targetRotationRef.current.x = networkGroup.rotation.x;
        } else if (isRotatingRef.current) {
          // Continuous gentle planetary spin
          networkGroup.rotation.y += 0.0018;
          targetRotationRef.current.y = networkGroup.rotation.y;
        } else {
          // Smooth fly-to selected coordinate
          networkGroup.rotation.y += (targetRotationRef.current.y - networkGroup.rotation.y) * 0.05;
          networkGroup.rotation.x += (targetRotationRef.current.x - networkGroup.rotation.x) * 0.05;
        }
      }

      // Orbiting outer rings
      secondRingMesh.rotation.z = elapsed * 0.15;

      // Animate material packets along arcs
      const t1 = (elapsed * 0.45) % 1;
      const t2 = (elapsed * 0.38 + 0.3) % 1;
      packet1.position.copy(arc1.curve.getPointAt(t1));
      packet2.position.copy(arc2.curve.getPointAt(t2));

      // Pulse beacon markers
      nodeMeshes.forEach((mesh, i) => {
        const scale = 1 + Math.sin(elapsed * 4 + i * 1.5) * 0.25;
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      earthGeo.dispose();
      earthMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      tacticalGeo.dispose();
      tacticalMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      secondRingGeo.dispose();
      secondRingMat.dispose();
      arc1.line.geometry.dispose();
      arc2.line.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  const activeProject = projectNodes[activeNode];

  return (
    <div className={`relative w-full rounded-3xl bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 border border-white/15 p-4 sm:p-6 shadow-[0_16px_45px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] overflow-hidden ${className}`}>
      {/* Top HUD Telemetry & Mode Selector Bar - Clean Glass Morph */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20 text-crimson-light shadow-sm backdrop-blur-md">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Google Earth 3D Operations & Logistics Grid</span>
              <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
            </h3>
            <p className="text-[11px] font-mono text-platinum-muted">
              Citra Satelit 3D Fotorealistik · Jaringan Manajemen Operasional Zefanya Zulian
            </p>
          </div>
        </div>

        {/* View Mode & Controls Toolbar - Clear Glass */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switch: Google Earth vs Tactical */}
          <div className="p-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('google-earth')}
              className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition ${
                viewMode === 'google-earth'
                  ? 'bg-crimson text-white font-bold shadow-glow-crimson'
                  : 'text-platinum-muted hover:text-white'
              }`}
              title="Aktifkan Tampilan Satelit Google Earth 3D"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Google Earth 3D</span>
            </button>
            <button
              onClick={() => setViewMode('tactical')}
              className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition ${
                viewMode === 'tactical'
                  ? 'bg-crimson text-white font-bold shadow-glow-crimson'
                  : 'text-platinum-muted hover:text-white'
              }`}
              title="Aktifkan Tampilan Tactical Cyber Grid"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tactical Grid</span>
            </button>
          </div>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-2xl border transition ${
              isRotating
                ? 'bg-crimson/20 border-crimson/40 text-crimson-light'
                : 'bg-black/40 backdrop-blur-md border-white/15 text-platinum-muted hover:text-white'
            }`}
            title={isRotating ? 'Jeda Rotasi Otomatis' : 'Mulai Rotasi Otomatis'}
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/15">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.6, 3.6))}
              className="p-2 text-platinum-muted hover:text-white border-r border-white/10 transition"
              title="Zoom In Satelit"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.6, 7.5))}
              className="p-2 text-platinum-muted hover:text-white transition"
              title="Zoom Out Satelit"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Node Fast Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-3 pb-1">
        <span className="text-[11px] font-mono text-platinum-muted uppercase mr-1">Fokus Lokasi:</span>
        {projectNodes.map((node) => (
          <button
            key={node.id}
            onClick={() => {
              setActiveNode(node.id);
              setIsRotating(false);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeNode === node.id
                ? 'bg-crimson text-white font-bold shadow-glow-crimson scale-102'
                : 'bg-white/5 border border-white/10 text-platinum hover:text-white hover:border-white/25 backdrop-blur-md'
            }`}
          >
            <MapPin className="w-3 h-3 text-crimson-light" />
            <span>#{node.id + 1} {node.name.split(' ')[0]}</span>
          </button>
        ))}

        {/* External Google Earth Full View Link */}
        <a
          href="https://earth.google.com/web/@-5.5000,111.0000,1000a,2500000d,35y,0h,20t,0r"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto px-3 py-1 rounded-xl text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 backdrop-blur-md transition flex items-center gap-1.5"
          title="Buka Koridor Operasional Indonesia di Google Earth Web (earth.google.com)"
        >
          <span>earth.google.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[360px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none my-2">
        <div ref={containerRef} className="w-full h-full" />

        {/* Drag & Controls Watermark - Glass Morph */}
        <div className="absolute top-3 left-3 pointer-events-none flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-platinum-muted uppercase tracking-widest px-3 py-1 rounded-xl bg-black/50 border border-white/15 backdrop-blur-md">
            Putar 360° · Scroll untuk Zoom · Drag dengan Inersia Fisik
          </span>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/25 px-2.5 py-0.5 rounded-lg backdrop-blur-md w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google Earth PBR Realistic Satellite Shading</span>
          </div>
        </div>

        {/* Live Active Node Floating Overlay Card - Clean Glass Morph */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] pointer-events-auto">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-crimson-light font-bold">
              <MapPin className="w-3.5 h-3.5 text-crimson" />
              <span>{activeProject.name}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              {activeProject.status}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white">{activeProject.company}</h4>
          <p className="text-xs text-crimson-light font-mono mt-0.5">{activeProject.role}</p>
          <p className="text-xs text-platinum-muted mt-1 leading-relaxed">
            {activeProject.scope}
          </p>

          <div className="mt-2 text-[11px] font-mono text-emerald-300/90 bg-white/[0.04] px-2.5 py-1 rounded-xl border border-white/10">
            ✓ {activeProject.highlights}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-platinum-muted/70">
              {activeProject.coords}
            </span>

            {/* Direct Official Google Earth 3D Deep Link */}
            <a
              href={activeProject.earthUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson hover:bg-crimson-dark text-white text-xs font-mono font-semibold shadow-glow-crimson transition active:scale-95"
            >
              <span>Buka di Google Earth 3D</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics - Clear Frosted Glass Chips */}
      <div className="mt-2 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Citra 3D Satelit</span>
          <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5 block">Fotorealistik PBR</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Mineral Transport</span>
          <span className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5 block">10.000 Ton/Minggu</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Material Procurement</span>
          <span className="text-xs sm:text-sm font-bold text-crimson-light font-mono mt-0.5 block">Jembatan Maritim</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Pusat Komando</span>
          <span className="text-xs sm:text-sm font-bold text-platinum font-mono mt-0.5 block">Bekasi Strategic HQ</span>
        </div>
      </div>
    </div>
  );
}
