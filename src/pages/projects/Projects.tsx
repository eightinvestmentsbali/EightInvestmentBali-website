import { Box, Container } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/navbar/Navbar";
import BestInvestmentOpportunity from "./Components/BestInvestmentOpportunity/BestInvestmentOpportunity";
// import ProjectWork from "./Components/BestInvestmentOpportunity/Components/ProjectsWork/ProjectWork";
import ContactFooter from "../home/components/ContactFooter/ContactFooter";
import { projectsData } from "../../components/Data/projectsData";
import { useLocation } from "react-router-dom";

const Projects: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const projectIndexFromState = location.state?.projectIndex;

  const initialIndex =
    typeof projectIndexFromState === "number" ? projectIndexFromState : 0;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Container
          maxWidth="xl"
          sx={{
            overflow: "visible",
            px: {
              xs: 2,
              sm: 4,
              md: 6,
              lg: 10,
              xl: 0,
            },
          }}
        >
          <Navbar />
          <BestInvestmentOpportunity
            data={projectsData}
            initialActiveIndex={initialIndex >= 0 ? initialIndex : 0}
          />
        </Container>
        {/* <ProjectWork /> */}
        <ContactFooter />
      </Box>
    </Box>
  );
};

export default Projects;
