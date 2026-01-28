import { Box, Container } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/navbar/Navbar";
import BestInvestmentOpportunity from "./Components/BestInvestmentOpportunity/BestInvestmentOpportunity";
import ProjectWork from "./Components/BestInvestmentOpportunity/Components/ProjectsWork/ProjectWork";
import ContactFooter from "../home/components/ContactFooter/ContactFooter";

const Projects: React.FC = () => {
  const theme = useTheme();
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
        <Container maxWidth="xl" sx={{ overflow: "visible" }}>
          <Navbar />
          <BestInvestmentOpportunity />
        </Container>
        <ProjectWork />
        <ContactFooter />
      </Box>
    </Box>
  );
};

export default Projects;
