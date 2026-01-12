import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const AnimatedGradientBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  // persistent values
  const pos = useRef({ x: 85, y: 15 });
  const target = useRef({ x: 85, y: 15 });
  const idleAngle = useRef(0);
  const isMouseActive = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      isMouseActive.current = true;
      target.current.x = (e.clientX / window.innerWidth) * 100;
      target.current.y = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      // 👉 Idle floating movement (when mouse not moving)
      if (!isMouseActive.current) {
        idleAngle.current += 0.003;
        target.current.x = 85 + Math.cos(idleAngle.current) * 8;
        target.current.y = 15 + Math.sin(idleAngle.current) * 8;
      }

      // Smooth interpolation
      pos.current.x += (target.current.x - pos.current.x) * 0.04;
      pos.current.y += (target.current.y - pos.current.y) * 0.04;

      if (blobRef.current) {
        blobRef.current.style.background = `
          radial-gradient(
            60% 60% at ${pos.current.x}% ${pos.current.y}%,
             rgba(8, 155, 126, 0.85),
            rgba(104, 255, 180, 0.82),
            rgba(199, 248, 244, 0.45),
            transparent 70%
          )
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <Box
      ref={blobRef}
      sx={{
        position: "absolute",
        inset: "-30%",
        filter: "blur(120px)",
        zIndex: 0,
        pointerEvents: "none",
        background: `
          radial-gradient(
            60% 60% at 85% 15%,
            rgba(21, 231, 189, 0.85),
            rgba(181, 253, 217, 0.65),
            rgba(199, 248, 244, 0.45),
            transparent 70%
          )
        `,
      }}
    />
  );
};

export default AnimatedGradientBlob;
