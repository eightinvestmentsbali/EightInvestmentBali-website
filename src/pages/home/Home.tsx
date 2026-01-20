import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useTheme } from "@mui/material/styles";
import ArchitectingProsperity from "./components/ArchitectingProsperity/ArchitectingProsperity";
import UnifyYourVision from "./components/UnifyYourVision/UnifyYourVision";
import WhyDoInvestorschoose from "./components/WhyDoInvestorschoose/WhyDoInvestorschoose";
import BestInvestmentOpportunity from "./components/BestInvestmentOpportunity/BestInvestmentOpportunity";
import Projects from "./components/Projects/Projects";
import OurProcess from "./components/OurProcess/OurProcess";
import OurServices from "./components/OurServices/OurServices";
import DiamondTeamSection from "./components/DiamondTeamSection/DiamondTeamSection";
import ContactFooter from "./components/ContactFooter/ContactFooter";
// import GLSLBackground from "../../components/background/GLSLBackground";
// import { Canvas } from "@react-three/fiber";
// import { ShaderPlane } from "../../components/background/ShaderPlane";
// import ShaderBackground from "../../components/background/ShaderBackground";
// import MeshBackground from "../../components/background/MeshBackground";
// import BackgroundParticles from "../../components/background/BackgroundParticles";
// import MuiGradientBackground from "../../components/background/MuiGradientBackground";
// import AnimatedGradientBlob from "../../components/background/AnimatedGradientBlob";

const Home: React.FC = () => {
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
      {/* <MuiGradientBackground /> */}
      {/* <BackgroundParticles /> */}
      {/* <AnimatedGradientBlob /> */}

      {/* <GLSLBackground /> */}
      {/* <ShaderBackground /> */}
      {/* <MeshBackground /> */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Container maxWidth="xl" sx={{ overflow: "visible" }}>
          <Navbar />
          <Grid container justifyContent="center" alignItems="center">
            <ArchitectingProsperity />
            <UnifyYourVision />
            <WhyDoInvestorschoose />
          </Grid>
        </Container>
        <BestInvestmentOpportunity />
        <Projects />
        <OurProcess />
        <OurServices />
        <DiamondTeamSection />
        <ContactFooter />
      </Box>
    </Box>
  );
};

export default Home;
