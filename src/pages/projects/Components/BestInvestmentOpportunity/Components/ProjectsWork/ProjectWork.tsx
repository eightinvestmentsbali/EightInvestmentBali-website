// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { typographyTokens } from "../../../../../../theme/MuiTheme";


// const ProjectWork: React.FC = () => {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         bgcolor: theme.palette.background.paper,
//         px: { xs: 2, md: 4, lg: 6 },
//       }}
//     >
//       <Box
//         sx={{
//           py: { xs: 6, md: 10 },
//         }}
//       >
//         <Typography
//           variant="heroTitle"
//           component="h1"
//           sx={{
//             color: theme.palette.text.primary,
//             mb: { xs: 2, md: 4 },
//             fontWeight: typographyTokens.fontWeights.medium,
//           }}
//         >
//           Projects
//         </Typography>

//         <Grid container spacing={4}>
//           {projects.map((project) => (
//             <Grid size={{ xs: 12, sm:6, md: 6 }} key={project.title}>
//               <Box
//                 sx={{
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   bgcolor: "#1E1E1E",
//                   cursor: "pointer",
//                   transition: "all .35s ease",

//                   "&:hover img": {
//                     transform: "scale(1.05)",
//                   },
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={project.image}
//                   sx={{
//                     width: "100%",
//                     height: { xs: 220, md: 360 },
//                     objectFit: "cover",
//                     transition: "transform .5s ease",
//                   }}
//                 />

//                 {/* TITLE */}
//                 <Box sx={{ py: 2 }}>
//                   <Typography
//                     align="center"
//                     sx={{
//                       color: "#ffffff",
//                       fontSize: "1.1rem",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {project.title}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ProjectWork;
