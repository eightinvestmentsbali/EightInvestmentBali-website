import { useEffect } from "react";
import { Gradient } from "whatamesh";

const MeshBackground: React.FC = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        zIndex: 1,

        // Mesh colors
        // These are CSS variables required by whatamesh
        ["--gradient-color-1" as any]: "#8de7f7ff",
        ["--gradient-color-2" as any]: "#b5b5ffff",
        ["--gradient-color-3" as any]: "#e29bbcff",
        ["--gradient-color-4" as any]: "#fcd49dff",
      }}
    />
  );
};

export default MeshBackground;


// "use client";

// import { useEffect, useRef } from "react";
// import {Gradient} from "whatamesh";

// const MeshBackground: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const gradient = new Gradient();
//     gradient.initGradient("#gradient-canvas");

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 20;
//       const y = (e.clientY / window.innerHeight - 0.5) * 20;

//       canvas.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
//     };

//     window.addEventListener("resize", handleResize);
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//        id="gradient-canvas"
//       style={{
//         position: "absolute",
//         inset: 0,
//         width: "100%",
//         height: "100vh",
//         transition: "transform 0.2s ease-out",
//         zIndex: 1,

//         ["--gradient-color-1" as any]: "#8de7f7ff",
//         ["--gradient-color-2" as any]: "#b5b5ffff",
//         ["--gradient-color-3" as any]: "#e29bbcff",
//         ["--gradient-color-4" as any]: "#fcd49dff",
//       }}
//     />
//   );
// };

// export default MeshBackground;
