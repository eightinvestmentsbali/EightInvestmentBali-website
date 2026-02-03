import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const AnimatedGradientBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  // Current position
  const pos = useRef({ x: 85, y: 15 });

  // Target position
  const target = useRef({ x: 85, y: 15 });

  // Idle animation angle
  const idleAngle = useRef(0);

  // Mouse activity flag
  const isMouseActive = useRef(false);
  const mouseActivityTimeout = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (mouseActivityTimeout.current) {
        window.clearTimeout(mouseActivityTimeout.current);
      }
      isMouseActive.current = true;
      target.current.x = (e.clientX / window.innerWidth) * 100;
      target.current.y = (e.clientY / window.innerHeight) * 100;

      // After 2 seconds of inactivity, resume the idle animation
      mouseActivityTimeout.current = window.setTimeout(() => {
        isMouseActive.current = false;
      }, 2000);
    };

    const animate = () => {
      // 🌊 Idle floating motion (when mouse is inactive)
      if (!isMouseActive.current) {
        idleAngle.current += 0.0018;
        target.current.x = 85 + Math.cos(idleAngle.current) * 10;
        target.current.y = 15 + Math.sin(idleAngle.current) * 10;
      }

      // 🧈 Ultra-smooth interpolation (premium feel)
      pos.current.x += (target.current.x - pos.current.x) * 0.025;
      pos.current.y += (target.current.y - pos.current.y) * 0.025;

      // More performant to update a CSS custom property
      if (blobRef.current) {
        blobRef.current.style.setProperty(
          "--gradient-pos",
          `${pos.current.x}% ${pos.current.y}%`
        );
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mouseActivityTimeout.current) {
        window.clearTimeout(mouseActivityTimeout.current);
      }
    };
  }, []);

  return (
    <Box
      ref={blobRef}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%", // ✅ gives it render space
        zIndex: 1,
        pointerEvents: "none",

        // Define the gradient using a CSS variable for the position
        // @ts-ignore - Allow custom property
        "--gradient-pos": "85% 15%",
        background: `
          radial-gradient(
            85% 85% at var(--gradient-pos),
            rgba(106, 48, 232, 0.59), rgba(14, 205, 135, 0.39),
            rgba(248, 101, 101, 0.43), rgba(56, 32, 238, 0.37),
            transparent 72%
          )
        `,

        filter: "blur(0px)",
        opacity: 0.8,

        // ❌ disable blend mode for now
        // mixBlendMode: "soft-light",
      }}
    />
  );
};

export default AnimatedGradientBlob;
