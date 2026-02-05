import React, { useEffect, useState } from "react";
import { Box, Container, Fab, Grid, Zoom } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import ArchitectingProsperity from "./components/ArchitectingProsperity/ArchitectingProsperity";
import UnifyYourVision from "./components/UnifyYourVision/UnifyYourVision";
import WhyDoInvestorschoose from "./components/WhyDoInvestorschoose/WhyDoInvestorschoose";
import BestInvestmentOpportunity from "./components/BestInvestmentOpportunity/BestInvestmentOpportunity";
import Projects from "./components/Projects/Projects";
import OurProcess from "./components/OurProcess/OurProcess";
import OurServices from "./components/OurServices/OurServices";
import DiamondTeamSection from "./components/DiamondTeamSection/DiamondTeamSection";
import ContactFooter from "./components/ContactFooter/ContactFooter";
import OurCoreValues from "./components/OurCoreValues/OurCoreValues";
// import GLSLBackground from "../../components/background/GLSLBackground";
// import { Canvas } from "@react-three/fiber";
// import { ShaderPlane } from "../../components/background/ShaderPlane";
// import ShaderBackground from "../../components/background/ShaderBackground";
// import MeshBackground from "../../components/background/MeshBackground";
// import BackgroundParticles from "../../components/background/BackgroundParticles";
// import MuiGradientBackground from "../../components/background/MuiGradientBackground";
import { useTheme } from "@mui/material/styles";
import AnimatedGradientBlob from "../../components/background/AnimatedGradientBlob";
import { useLocation } from "react-router-dom";
// import AnimatedGradient from "../../components/background/AnimatedGradient";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Home: React.FC = () => {
  const theme = useTheme();

  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const sectionId = location.state?.scrollTo;

    if (!sectionId) return;

    const section = document.getElementById(sectionId);

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past the hero section (e.g., more than 80vh)
      const heroHeight = window.innerHeight * 0.8;
      setShowBackToTop(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: theme.palette.background.paper,
      }}
    >
      {/* <AnimatedGradient /> */}
      <AnimatedGradientBlob />

      {/* Your content */}
      {/* <MuiGradientBackground /> */}
      {/* <BackgroundParticles /> */}

      {/* <GLSLBackground /> */}
      {/* <ShaderBackground /> */}
      {/* <MeshBackground /> */}
      <Navbar />
      <Box
        sx={{ position: "relative", zIndex: 1 }}
        // style={{
        // filter: "saturate(115%) contrast(105%)",
        // }}
      >
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
        <OurCoreValues />
        <DiamondTeamSection />
        <ContactFooter />
      </Box>
      <Zoom in={showBackToTop}>
        <Fab
          onClick={scrollToTop}
          aria-label="scroll back to top"
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 32 },
            right: { xs: 16, md: 32 },
            zIndex: 1000,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
             "&:hover": {
              bgcolor: theme.palette.primary.main, // Keep same color
              transform: "scale(1.1)",
            },
            "&:active": {
              bgcolor: theme.palette.primary.main, // Keep same color on tap
            },
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.20)",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default Home;
