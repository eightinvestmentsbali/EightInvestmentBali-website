// import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim";
// import type { Engine } from "tsparticles-engine";
// import { useCallback } from "react";

// export default function BackgroundParticles() {
//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadSlim(engine); // ✅ IMPORTANT
//   }, []);

//   return (
//     <Particles
//       init={particlesInit}
//       options={{
//         fullScreen: false,
//         particles: {
//           number: { value: 500 },
//           color: { value: "#4ec3a1" },
//           size: { value: 3 },
//           move: { enable: true, speed: 1 },
//           opacity: { value: 0.6 },
//           links: {
//             enable: true,
//             distance: 150,
//             color: "#4ec3a1",
//             opacity: 0.4,
//           },
//         },
//       }}
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%", // ✅ THIS IS THE KEY
//         zIndex: 1,
//         pointerEvents: "none",
//       }}
//     />
//   );
// }
