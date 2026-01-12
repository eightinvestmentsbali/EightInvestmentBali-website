import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const MuiGradientBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 1;
      currentY += (targetY - currentY) * 1;

      if (bgRef.current) {
        bgRef.current.style.background = `
          radial-gradient(
            900px at ${currentX}% ${currentY}%,
            rgba(25, 204, 153, 1) 0%,
            rgba(135, 209, 248, 1) 35%,
            rgba(240,248,255,1) 70%
          )
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <Box
      ref={bgRef}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(900px at 50% 50%, rgba(78,195,161,0.45), rgba(240,248,255,1))",
        transition: "background 0.1s linear",
      }}
    />
  );
};

export default MuiGradientBackground;
