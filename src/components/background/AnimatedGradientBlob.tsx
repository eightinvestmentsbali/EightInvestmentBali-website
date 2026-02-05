import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const HERO_HEIGHT = "80vh"; // 🔒 blob visible area

const AnimatedGradientBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const t = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      if (!blobRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      t.current += 0.003; // 🔥 Slow increment for smooth motion

      // 🌊 ZIGZAG WAVE MOTION
      // Horizontal movement (left-right oscillation)
      const horizontalWave = Math.sin(t.current * 0.8);
      const waveAmplitude = window.innerWidth * 0.5;
      const centerOffset = -window.innerWidth * 0.3;
      const baseOffsetX = centerOffset + horizontalWave * waveAmplitude;

      // 🎯 VERTICAL ZIGZAG - creates the wave path
      // Uses a different frequency to create the zigzag pattern
      const verticalZigzag = Math.sin(t.current * 2.5); // Higher frequency for zigzag
      const verticalAmplitude = 150; // Controls height of zigzag
      const baseOffsetY = verticalZigzag * verticalAmplitude;

      // Add subtle organic variations
      const offsetX =
        baseOffsetX +
        Math.sin(t.current * 1.5) * 20 +
        Math.cos(t.current * 1.2) * 15;

      const offsetY =
        baseOffsetY +
        Math.cos(t.current * 1.8) * 30 +
        Math.sin(t.current * 0.9) * 20;

      blobRef.current.style.transform = `
        translate(${offsetX}px, ${offsetY}px)
      `;

      blobRef.current.style.borderRadius = `
        ${60 + Math.sin(t.current * 1.1) * 10}% 
        ${70 + Math.cos(t.current * 1.3) * 12}% 
        ${55 + Math.sin(t.current * 0.9) * 8}% 
        ${65 + Math.cos(t.current * 1.4) * 10}% /
        ${65}% ${55}% ${70}% ${60}%
      `;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        height: HERO_HEIGHT,
        width: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity .4s ease",

        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Box
        ref={blobRef}
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-20%", 
          width: "50vmax",
          height: "45vmax",
          background: `radial-gradient(
            60% 60% at 50% 50%,
            rgba(3, 91, 69, 0.95) 0%,
            rgba(10, 115, 77, 0.97) 40%,
            rgba(76, 185, 229, 0.71) 70%,
            transparent 100%
          )`,
          filter: "blur(90px)",
          willChange: "transform, border-radius",
        }}
      />
    </Box>
  );
};

export default AnimatedGradientBlob;