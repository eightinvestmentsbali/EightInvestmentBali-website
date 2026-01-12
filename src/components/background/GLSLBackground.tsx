import { Box, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const GLSLBackground = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    /* ---------------- SCENE ---------------- */
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    /* ---------------- UNIFORMS ---------------- */
    // Helper to convert MUI hex colors to glsl-friendly vectors
    const themeColor = new THREE.Color(theme.palette.primary.main);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_color: { value: new THREE.Vector3(themeColor.r, themeColor.g, themeColor.b) },
    };

    /* ---------------- SHADER ---------------- */
    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: `
        precision highp float;
        attribute vec3 position;
        varying vec2 vUv;
        void main() {
          vUv = position.xy * 0.5 + 0.5;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec3 u_color;

        // --- PASTE GLSL.APP CODE BELOW ---
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
        }
        float fbm(vec2 p) {
          float v = 0.0; float a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }
        // --- END GLSL.APP CODE ---

        void main() {
          vec2 st = vUv * vec2(u_resolution.x / u_resolution.y, 1.0);
          float n = fbm(st * 3.0 + u_time * 0.2);
          
          // Using the MUI theme color passed via uniform
          vec3 baseColor = u_color; 
          vec3 finalColor = mix(baseColor, vec3(0.95, 0.98, 1.0), n + u_mouse.x * 0.2);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /* ---------------- LISTENERS ---------------- */
    const onMouseMove = (e: MouseEvent) => {
      // Use window coordinates because the background is fixed
      uniforms.u_mouse.value.set(
        e.clientX / window.innerWidth,
        1 - (e.clientY / window.innerHeight)
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    });

    window.addEventListener("mousemove", onMouseMove);
    resizeObserver.observe(container);

    /* ---------------- LOOP ---------------- */
    let frameId: number;
    const animate = () => {
      uniforms.u_time.value += 0.015;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    /* ---------------- CLEANUP ---------------- */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme.palette.primary.main]); // Re-run if theme color changes

  return (
    <Box
      ref={mountRef}
      sx={{
        position: "fixed", // Keeps background stable during scroll
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,        // Stay behind content
        pointerEvents: "none", // Clicks pass through to MUI buttons
        overflow: "hidden",
      }}
    />
  );
};

export default GLSLBackground;