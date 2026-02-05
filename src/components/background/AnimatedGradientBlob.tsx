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

      t.current += 0.028;

      const offsetX =
        Math.sin(t.current * 0.9) * 80 +
        Math.cos(t.current * 0.5) * 40;

      const offsetY =
        Math.cos(t.current * 0.7) * 60 +
        Math.sin(t.current * 0.4) * 30;

      blobRef.current.style.transform = `
        translate(${offsetX}px, ${offsetY}px)
      `;

      blobRef.current.style.borderRadius = `
        ${60 + Math.sin(t.current) * 10}% 
        ${70 + Math.cos(t.current) * 12}% 
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
    height: HERO_HEIGHT, // 70vh
    width: "100%",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 0,
    opacity: visible ? 1 : 0,
    transition: "opacity .4s ease",

    // 👇 THIS IS THE KEY PART
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgb(121, 118, 118) 65%, rgba(0,0,0,0) 100%)",
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
            rgba(9, 186, 202, 0.71) 70%,
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
