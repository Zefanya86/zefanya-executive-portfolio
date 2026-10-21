'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Network, Activity, Navigation as NavIcon, ShieldCheck, MapPin } from 'lucide-react';

interface OperationsNetwork3DProps {
  className?: string;
}

export default function OperationsNetwork3D({ className = '' }: OperationsNetwork3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number>(0);
  const [isRotating, setIsRotating] = useState(true);

  const projectNodes = [
    {
      id: 0,
      name: 'Bekasi Central HQ',
      company: 'PT. Aba Mandiri Sejahtera',
      role: 'General Manager (2026 — Present)',
      scope: 'Enterprise Procurement & Commercial Real Estate Governance',
      coords: '6.2383° S, 106.9756° E',
      status: 'Active Command',
    },
    {
      id: 1,
      name: 'Bayah Mineral Logistics Hub',
      company: 'PT. Mahaputra Baruna Logistik',
      role: 'Site Operations Manager (2025)',
      scope: 'Bulk Mineral Flow Transport, Fleet Telemetry, Loading to Delivery',
      coords: '6.9288° S, 106.2536° E',
      status: 'Field Operations',
    },
    {
      id: 2,
      name: 'Maritime Bridge Construction Project',
      company: 'PT. Asri — Praya, KSO',
      role: 'Head of Logistics / Material Procurement (2024 — 2025)',
      scope: 'Kalimantan Island to Laut Island Maritime Bridge Infrastructure',
      coords: '3.3194° S, 116.2230° E',
      status: 'Infrastructure Milestone',
    },
  ];

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
    camera.position.set(0, 2.5, 6.5);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x11141a, 3.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd8dde5, 4.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const redRimLight = new THREE.PointLight(0xd72e43, 6.0, 25);
    redRimLight.position.set(-5, 3, -3);
    scene.add(redRimLight);

    // 5. Main 3D Operations Globe & Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Tactical Wireframe Globe representing Operational Domain
    const globeGeo = new THREE.SphereGeometry(2.0, 36, 18);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x19202c,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    networkGroup.add(globeMesh);

    // Inner Dark Core with Rim Fresnel reflection
    const coreGeo = new THREE.SphereGeometry(1.92, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x07090c,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    networkGroup.add(coreMesh);

    // Equatorial & Latitude Tactical Orbit Rings
    const ringGeo = new THREE.RingGeometry(2.3, 2.33, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd8dde5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    networkGroup.add(ringMesh);

    const secondRingGeo = new THREE.RingGeometry(2.6, 2.62, 64);
    const secondRingMat = new THREE.MeshBasicMaterial({
      color: 0xd72e43,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const secondRingMesh = new THREE.Mesh(secondRingGeo, secondRingMat);
    secondRingMesh.rotation.x = Math.PI / 2.3;
    networkGroup.add(secondRingMesh);

    // Node Positions on the Globe (Mapped relative to Indonesian archipelago operations)
    // 0: Bekasi / Java (Front-center)
    // 1: Banten / West (West of Bekasi)
    // 2: Kalimantan / Maritime Strait (North-East)
    const nodeCoords = [
      new THREE.Vector3(0.3, -0.2, 1.95),    // Bekasi HQ
      new THREE.Vector3(-0.6, -0.3, 1.88),   // Banten Haulage
      new THREE.Vector3(0.9, 0.4, 1.75),     // Kalimantan Bridge Project
    ];

    const nodeMeshes: THREE.Mesh[] = [];

    nodeCoords.forEach((pos, idx) => {
      // Base glowing marker sphere
      const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0xd72e43 : 0xff5268,
        emissive: idx === 0 ? 0xd72e43 : 0xa11c2e,
        emissiveIntensity: 1.5,
        roughness: 0.1,
      });
      const nodeSphere = new THREE.Mesh(sphereGeo, sphereMat);
      nodeSphere.position.copy(pos);
      networkGroup.add(nodeSphere);
      nodeMeshes.push(nodeSphere);

      // Outer Pulsing Ring around Node
      const nodePulseGeo = new THREE.RingGeometry(0.12, 0.15, 32);
      const nodePulseMat = new THREE.MeshBasicMaterial({
        color: 0xd72e43,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const pulseMesh = new THREE.Mesh(nodePulseGeo, nodePulseMat);
      pulseMesh.position.copy(pos);
      pulseMesh.lookAt(pos.clone().multiplyScalar(2));
      networkGroup.add(pulseMesh);
    });

    // 6. Curved Logistics & Supply Arcs between the Operational Hubs
    function createCurve(p1: THREE.Vector3, p2: THREE.Vector3, heightBoost = 0.5) {
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(p1.length() + heightBoost);
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: 0xd72e43,
        transparent: true,
        opacity: 0.75,
        linewidth: 2,
      });
      return { line: new THREE.Line(geo, mat), curve };
    }

    // Arc 1: Banten -> Bekasi (Mineral Logistics flow)
    const arc1 = createCurve(nodeCoords[1], nodeCoords[0], 0.35);
    networkGroup.add(arc1.line);

    // Arc 2: Bekasi -> Kalimantan (Material Procurement & Bridge Supply pipeline)
    const arc2 = createCurve(nodeCoords[0], nodeCoords[2], 0.55);
    networkGroup.add(arc2.line);

    // 7. Moving Cargo / Data Packets traveling along the Arcs
    const packetGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packet1 = new THREE.Mesh(packetGeo, packetMat);
    const packet2 = new THREE.Mesh(packetGeo, packetMat);
    networkGroup.add(packet1);
    networkGroup.add(packet2);

    // Ambient floating particles
    const particleCount = 80;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
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

    // Pointer Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      networkGroup.rotation.y += deltaX * 0.006;
      networkGroup.rotation.x += deltaY * 0.006;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

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

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle auto-rotation when not dragging
      if (!isDragging && isRotating) {
        networkGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.25;
        networkGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.1;
      }

      // Orbiting outer rings
      secondRingMesh.rotation.z = elapsed * 0.2;

      // Animate cargo packets along arcs
      const t1 = (elapsed * 0.5) % 1;
      const t2 = (elapsed * 0.4 + 0.3) % 1;
      packet1.position.copy(arc1.curve.getPointAt(t1));
      packet2.position.copy(arc2.curve.getPointAt(t2));

      // Pulse nodes
      nodeMeshes.forEach((mesh, i) => {
        const scale = 1 + Math.sin(elapsed * 4 + i) * 0.2;
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      globeGeo.dispose();
      globeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      secondRingGeo.dispose();
      secondRingMat.dispose();
      arc1.line.geometry.dispose();
      arc2.line.geometry.dispose();
      renderer.dispose();
    };
  }, [isRotating]);

  const activeProject = projectNodes[activeNode];

  return (
    <div className={`relative w-full rounded-2xl bg-gradient-to-b from-graphite-surface via-obsidian-soft to-obsidian border border-platinum/15 p-4 sm:p-6 shadow-cinematic overflow-hidden ${className}`}>
      {/* Top HUD Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-platinum/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-crimson/15 border border-crimson/30 text-crimson shadow-glow-crimson">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Integrated Operations & Logistics Grid 3D</span>
              <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
            </h3>
            <p className="text-[11px] font-mono text-platinum-muted">
              Visualisasi 3D Jaringan Manajemen Operasional, Pengadaan & Armada Proyek
            </p>
          </div>
        </div>

        {/* Node Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {projectNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                activeNode === node.id
                  ? 'bg-crimson text-white font-bold shadow-glow-crimson'
                  : 'bg-obsidian border border-platinum/10 text-platinum-muted hover:text-white'
              }`}
            >
              #{node.id + 1} {node.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
        <div ref={containerRef} className="w-full h-full" />

        {/* Drag Hint Watermark */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="text-[10px] font-mono text-platinum-muted/60 uppercase tracking-widest px-2.5 py-1 rounded bg-obsidian/70 border border-platinum/10">
            Drag to Rotate 360° · Real-time Material Arcs
          </span>
        </div>

        {/* Live Active Node Floating Overlay Card */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md p-4 rounded-xl bg-graphite/95 backdrop-blur-md border border-platinum/20 shadow-card-executive pointer-events-auto">
          <div className="flex items-center justify-between gap-2 border-b border-platinum/10 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-crimson font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeProject.name}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              {activeProject.status}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white">{activeProject.company}</h4>
          <p className="text-xs text-crimson font-mono mt-0.5">{activeProject.role}</p>
          <p className="text-xs text-platinum-muted mt-1 leading-relaxed">
            {activeProject.scope}
          </p>

          <div className="mt-3 pt-2 border-t border-platinum/10 flex items-center justify-between text-[10px] font-mono text-platinum-muted/70">
            <span>Coordinates: {activeProject.coords}</span>
            <span className="text-crimson">Zefanya Zulian Executive Domain</span>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics Bar */}
      <div className="mt-4 pt-3 border-t border-platinum/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-2.5 rounded-lg bg-obsidian border border-platinum/10">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">SOP Implementation</span>
          <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-0.5 block">100% Enforced</span>
        </div>
        <div className="p-2.5 rounded-lg bg-obsidian border border-platinum/10">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Mineral Haulage</span>
          <span className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5 block">Zero Bottleneck</span>
        </div>
        <div className="p-2.5 rounded-lg bg-obsidian border border-platinum/10">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Material Procurement</span>
          <span className="text-xs sm:text-sm font-bold text-crimson font-mono mt-0.5 block">End-to-End Control</span>
        </div>
        <div className="p-2.5 rounded-lg bg-obsidian border border-platinum/10">
          <span className="text-[10px] font-mono text-platinum-muted uppercase block">Executive Governance</span>
          <span className="text-xs sm:text-sm font-bold text-platinum font-mono mt-0.5 block">Cross-Functional</span>
        </div>
      </div>
    </div>
  );
}
