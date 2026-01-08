// import { Box } from "@mui/material";
// import { useEffect, useRef } from "react";

// const AnimatedGradientBlob = () => {
//   const blobRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       if (!blobRef.current) return;

//       const x = (e.clientX / window.innerWidth) * 100;
//       const y = (e.clientY / window.innerHeight) * 100;

//       blobRef.current.style.background = `
//         radial-gradient(
//           60% 60% at ${x}% ${y}%,
//           rgba(236,72,153,0.8),
//           rgba(168,85,247,0.6),
//           rgba(59,130,246,0.4),
//           transparent 70%
//         )
//       `;
//     };

//     window.addEventListener("mousemove", onMove);
//     return () => window.removeEventListener("mousemove", onMove);
//   }, []);

//   return (
//     <Box
//       ref={blobRef}
//       sx={{
//         position: "absolute",
//         inset: "-30%",
//         filter: "blur(120px)",
//         zIndex: 0,
//         transition: "background 0.15s ease-out",
//         pointerEvents: "none",
//       }}
//     />
//   );
// };

// export default AnimatedGradientBlob;
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

const AnimatedGradientBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  // default position → top-right
  let currentX = 85;
  let currentY = 15;
  let targetX = 85;
  let targetY = 15;
  let hasMoved = false;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      hasMoved = true;
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (blobRef.current) {
        blobRef.current.style.background = `
          radial-gradient(
            60% 60% at ${currentX}% ${currentY}%,
            rgba(112, 237, 105, 0.85),
            rgba(168,85,247,0.65),
            rgba(59,130,246,0.45),
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
            rgba(236,72,153,0.85),
            rgba(168,85,247,0.65),
            rgba(59,130,246,0.45),
            transparent 70%
          )
        `,
      }}
    />
  );
};

export default AnimatedGradientBlob;
