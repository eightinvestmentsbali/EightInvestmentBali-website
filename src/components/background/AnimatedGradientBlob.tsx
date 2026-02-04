import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const AnimatedGradientBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  // Start at top right (85vw, 15vh)
  const pos = useRef({ x: window.innerWidth * 0.85, y: window.innerHeight * 0.15 });
  const target = useRef({ x: window.innerWidth * 0.85, y: window.innerHeight * 0.15 });
  
  const idleAngle = useRef(0);
  const isMouseActive = useRef(false);
  const mouseActivityTimeout = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (mouseActivityTimeout.current) window.clearTimeout(mouseActivityTimeout.current);
      
      isMouseActive.current = true;
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      mouseActivityTimeout.current = window.setTimeout(() => {
        isMouseActive.current = false;
      }, 2000);
    };

    const animate = () => {
      if (!isMouseActive.current) {
        idleAngle.current += 0.015;
        // Float around the last known target or initial top-right
        const centerX = isMouseActive.current ? target.current.x : window.innerWidth * 0.85;
        const centerY = isMouseActive.current ? target.current.y : window.innerHeight * 0.15;
        
        target.current.x = centerX + Math.cos(idleAngle.current) * 30;
        target.current.y = centerY + Math.sin(idleAngle.current) * 30;
      }

      // Smooth interpolation (Lerp)
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;

      if (blobRef.current) {
        // Use transform translate for much better performance than background-position
        blobRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Box
      ref={blobRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        // Responsive sizing using vmax
        width: { xs: "30vmax", md: "40vmax" },
        height: { xs: "30vmax", md: "40vmax" },
        borderRadius: "50%",
        zIndex: 0,
        pointerEvents: "none",
        background: `radial-gradient(circle, 
          rgba(28, 99, 81, 1) 0%, 
          rgba(10, 150, 99, 0.8) 40%, 
          rgba(5, 150, 234, 0.54) 70%, 
          transparent 100%)`,
        filter: { xs: "blur(40px)", md: "blur(90px)" },
        opacity: 0.8,
        willChange: "transform", // Optimizes GPU rendering
      }}
    />
  );
};

export default AnimatedGradientBlob;